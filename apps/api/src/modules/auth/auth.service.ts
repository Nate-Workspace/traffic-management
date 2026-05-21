import {
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { eq } from "drizzle-orm";
import type { Response } from "express";
import { DRIZZLE_DB } from "@database/database.tokens";
import type { Database } from "@database/database.types";
import { ADMIN_ROLE } from "./auth.constants";
import { admins } from "./schema/admins.schema";
import type { AdminPublic, JwtPayload, SessionValidation } from "./types/auth.types";
import type { RequestWithAdmin } from "./types/request.types";
import {
  clearAuthCookie,
  getAuthCookie,
  setAuthCookie,
  type AuthCookieConfig,
} from "./utils/cookie.util";
import { signAccessToken, verifyAccessToken } from "./utils/jwt.util";
import { comparePassword } from "./utils/password.util";

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE_DB) private readonly db: Database,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private getCookieConfig(): AuthCookieConfig {
    const auth = this.configService.get<AuthCookieConfig & { jwtSecret: string }>(
      "auth",
      { infer: true },
    );

    if (!auth) {
      throw new Error("Auth configuration is missing");
    }

    return {
      name: auth.cookieName ?? "tm_session",
      secure: auth.cookieSecure,
      sameSite: auth.cookieSameSite,
      maxAgeMs: auth.cookieMaxAgeMs,
    };
  }

  private toAdminPublic(
    admin: typeof admins.$inferSelect,
  ): AdminPublic {
    return {
      id: admin.id,
      fullName: admin.fullName,
      email: admin.email,
      role: ADMIN_ROLE,
      createdAt: admin.createdAt.toISOString(),
      updatedAt: admin.updatedAt.toISOString(),
    };
  }

  private buildJwtPayload(admin: typeof admins.$inferSelect): JwtPayload {
    return {
      sub: admin.id,
      email: admin.email,
      role: ADMIN_ROLE,
    };
  }

  async login(
    email: string,
    password: string,
    response: Response,
  ): Promise<AdminPublic> {
    const [admin] = await this.db
      .select()
      .from(admins)
      .where(eq(admins.email, email.toLowerCase()))
      .limit(1);

    if (!admin) {
      throw new UnauthorizedException({
        code: "invalid_credentials",
        message: "Invalid email or password",
      });
    }

    const isValid = await comparePassword(password, admin.passwordHash);

    if (!isValid) {
      throw new UnauthorizedException({
        code: "invalid_credentials",
        message: "Invalid email or password",
      });
    }

    const token = signAccessToken(
      this.jwtService,
      this.buildJwtPayload(admin),
    );
    setAuthCookie(response, token, this.getCookieConfig());

    return this.toAdminPublic(admin);
  }

  logout(response: Response): { success: true } {
    clearAuthCookie(response, this.getCookieConfig());
    return { success: true };
  }

  async getCurrentAdmin(adminId: string): Promise<AdminPublic> {
    const [admin] = await this.db
      .select()
      .from(admins)
      .where(eq(admins.id, adminId))
      .limit(1);

    if (!admin) {
      throw new UnauthorizedException({
        code: "admin_not_found",
        message: "Admin account not found",
      });
    }

    return this.toAdminPublic(admin);
  }

  async validateSessionWithProfile(
    request: RequestWithAdmin,
  ): Promise<SessionValidation> {
    const cookieName = this.configService.get<string>("auth.cookieName", {
      infer: true,
    });

    if (!cookieName) {
      return { authenticated: false, admin: null };
    }

    const token = getAuthCookie(request, cookieName);

    if (!token) {
      return { authenticated: false, admin: null };
    }

    const payload = verifyAccessToken(this.jwtService, token);

    if (!payload) {
      return { authenticated: false, admin: null };
    }

    try {
      const admin = await this.getCurrentAdmin(payload.sub);
      return { authenticated: true, admin };
    } catch {
      return { authenticated: false, admin: null };
    }
  }
}
