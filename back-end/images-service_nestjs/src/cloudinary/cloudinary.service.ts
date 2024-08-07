import { Injectable } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';

@Injectable()
export class CloudinaryService {
  constructor(private cloudinaryProvider: CloudinaryProvider) {}

  uploadImage(file: Express.Multer.File) {
    return this.cloudinaryProvider.uploadImage(file);
  }
}

export interface CloudinaryUploadResponse {
  url: string;
  secure_url: string;
  public_id: string;
}
