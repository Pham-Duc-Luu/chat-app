import { Module } from '@nestjs/common';
import { CloudinaryUploadController } from './cloudinary-upload.controller';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [CloudinaryUploadController],
  providers: [CloudinaryService],
})
export class CloudinaryUploadModule {}
