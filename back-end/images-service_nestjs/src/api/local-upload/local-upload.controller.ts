// import {
//   Controller,
//   Post,
//   UploadedFile,
//   UseInterceptors,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { UploadService } from './upload.service';

// @Controller('upload')
// export class UploadController {
//   constructor(private readonly uploadService: UploadService) {}

//   @Post('image')
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadImage(@UploadedFile() file: Express.Multer.File) {
//     const result = await this.uploadService.uploadImage(file);
//     return {
//       url: result.url,
//       id: result.public_id,
//     };
//   }
// }
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './local-upload.service';

@Controller('/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  // sử dụng endpoint POST tại đường dẫn góc của controller
  @Post()
  // Sử dụng FileInterceptor để xử lý file được upload, với tên trường là 'file'
  @UseInterceptors(FileInterceptor('file'))
  // Định nghĩa phương thức uploadFile để xử lý file upload
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.uploadService.handleFileUpload(file);
  }
}