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
import { UploadController } from './local-upload.controller';
import { UploadService } from './local-upload.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  // Đăng ký module 
  imports: [
    MulterModule.register({
      // cấu hình file lưu trữ 
      storage: diskStorage({
        // chỉ định đường dẫn 
        destination: './uploads',
        // chọn tên 
        filename: (req, file, cb) => {
          // Tạo tên file duy nhất bằng cách kết hợp thời gian hiện tại và một số ngẫu nhiên
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          // Gọi callback để đặt tên file với phần mở rộng gốc
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
