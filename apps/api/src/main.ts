import "reflect-metadata";
import { Logger, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { ResponseTransformInterceptor } from "./common/interceptors/response-transform.interceptor";
import { ZodValidationPipe } from "./common/pipes/zod-validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = new Logger("Bootstrap");
  app.useLogger(logger);
  app.enableShutdownHooks();
  const configService = app.get(ConfigService);
  const appConfig = configService.get<{
    port: number;
    prefix: string;
    version: string;
    corsOrigins: string[];
  }>("app", { infer: true });

  if (!appConfig) {
    throw new Error("App configuration is missing");
  }

  app.use(cookieParser());
  app.setGlobalPrefix(appConfig.prefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: appConfig.version,
  });
  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseTransformInterceptor(),
  );
  app.enableCors({
    origin: appConfig.corsOrigins,
    credentials: true,
  });

  await app.listen(appConfig.port);
  logger.log(
    `API running on http://localhost:${appConfig.port}/${appConfig.prefix}/v${appConfig.version}`,
  );
}

void bootstrap();
