import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryUploadService } from './cloudinary-upload.service';

@Controller('/cloudinary-upload')
export class CloudinaryUploadController {
  constructor(
    private readonly cloudinaryUploadService: CloudinaryUploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result =
      await this.cloudinaryUploadService.uploadImageToCloudinary(file);
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }
}
