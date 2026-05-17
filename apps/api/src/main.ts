import "reflect-metadata";
import { Logger, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { env } from "./config/env";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { ResponseTransformInterceptor } from "./common/interceptors/response-transform.interceptor";
import { ZodValidationPipe } from "./common/pipes/zod-validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = new Logger("Bootstrap");
  app.useLogger(logger);
  app.enableShutdownHooks();
  app.setGlobalPrefix(env.API_PREFIX);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: env.API_VERSION,
  });
  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseTransformInterceptor(),
  );
  app.enableCors({
    origin: env.CORS_ORIGINS,
    credentials: true,
  });

  await app.listen(env.PORT);
  logger.log(`API running on http://localhost:${env.PORT}/${env.API_PREFIX}/v${env.API_VERSION}`);
}

void bootstrap();
