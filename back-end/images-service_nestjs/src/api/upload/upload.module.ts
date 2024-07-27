// import { Module } from '@nestjs/common';
// import { UploadService } from './upload.service';
// import { UploadController } from './upload.controller';
// import { ConfigModule } from '@nestjs/config';
// import { CloudinaryProvider } from 'src/config/cloudinary.config';

// @Module({
//   imports: [ConfigModule],
//   providers: [UploadService, CloudinaryProvider],
//   controllers: [UploadController],
// })
// export class UploadModule {}
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
