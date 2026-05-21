import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { IS_PUBLIC_KEY } from "@common/decorators/public.decorator";
import { getAuthCookie } from "../utils/cookie.util";
import { verifyAccessToken } from "../utils/jwt.util";
import type { RequestWithAdmin } from "../types/request.types";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithAdmin>();
    const cookieName = this.configService.get<string>("auth.cookieName", {
      infer: true,
    });

    if (!cookieName) {
      throw new UnauthorizedException({
        code: "auth_misconfigured",
        message: "Authentication is not configured",
      });
    }

    const token = getAuthCookie(request, cookieName);

    if (!token) {
      throw new UnauthorizedException({
        code: "unauthorized",
        message: "Authentication required",
      });
    }

    const payload = verifyAccessToken(this.jwtService, token);

    if (!payload) {
      throw new UnauthorizedException({
        code: "invalid_session",
        message: "Session is invalid or expired",
      });
    }

    request.admin = payload;
    return true;
  }
}
