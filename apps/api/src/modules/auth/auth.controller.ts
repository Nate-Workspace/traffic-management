import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import type { Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { Public } from "./decorators/public.decorator";
import { CurrentAdmin } from "./decorators/current-admin.decorator";
import type { JwtPayload } from "./types/auth.types";
import type { RequestWithAdmin } from "./types/request.types";

@Controller({ path: "auth", version: "1" })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() payload: LoginDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(payload.email, payload.password, response);
  }

  @Public()
  @Post("logout")
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  @Get("me")
  getMe(@CurrentAdmin() admin: JwtPayload) {
    return this.authService.getCurrentAdmin(admin.sub);
  }

  @Public()
  @Get("session")
  getSession(@Req() request: RequestWithAdmin) {
    return this.authService.validateSessionWithProfile(request);
  }
}
