import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppConfigEnv from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set the global prefix

  app.setGlobalPrefix(AppConfigEnv.APP_BASE_URL);

  await app.listen(AppConfigEnv.APP_PORT);
}

bootstrap();
