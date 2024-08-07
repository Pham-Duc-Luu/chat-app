import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './middlewares/logger';
import AppConfigEnv from './config/app.config';
import { Module } from '@nestjs/common';
import { UploadModule } from './api/upload/upload.module';

AppConfigEnv;

@Module({
  imports: [ConfigModule.forRoot(), LoggerModule, UploadModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
