import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Injectable()
export class CloudinaryUploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadImageToCloudinary(file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    console.log(file);
    return await this.cloudinaryService.uploadImage(file);
  }
}
