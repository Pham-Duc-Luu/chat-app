// import { Injectable, Inject } from '@nestjs/common';
// import { v2 as cloudinary } from 'cloudinary';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class UploadService {
//   constructor(
//     @Inject('Cloudinary') private cloudinary,
//     private configService: ConfigService,
//   ) {}

//   async uploadImage(file: Express.Multer.File): Promise<any> {
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream((error, result) => {
//           if (error) reject(error);
//           resolve(result);
//         })
//         .end(file.buffer);
//     });
//   }
// }
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  handleFileUpload(file: Express.Multer.File) {
    return {
      // Trả về thông tin về file đã upload, bao gồm tên gốc và tên file sau khi được lưu trữ
      originalname: file.originalname,
      filename: file.filename,
    };
  }
}
