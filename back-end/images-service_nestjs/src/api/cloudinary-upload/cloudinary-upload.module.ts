import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryUploadController } from './cloudinary-upload.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryUploadService } from './cloudinary-upload.service';
import * as cloudinary from 'cloudinary';
@Module({
  imports: [
    CloudinaryModule,
    MulterModule.register({
      storage: {
        _handleFile(req, file, cb) {
          const cloudinaryService = new CloudinaryService(cloudinary);
          cloudinaryService
            .uploadImage(file)
            .then((result) => {
              cb(null, {
                path: result.secure_url,
                filename: result.public_id,
              });
            })
            .catch((err) => cb(err, null));
        },
        _removeFile(req, file, cb) {
          // Implement this if needed
        },
      },
    }),
  ],
  controllers: [CloudinaryUploadController],
  providers: [CloudinaryUploadService, CloudinaryService],
})
export class CloudinaryUploadModule {}

