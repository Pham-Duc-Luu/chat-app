import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import AppConfigEnv from './app.config';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (configService: ConfigService) => {
    return cloudinary.config({
      cloud_name: AppConfigEnv.CLOUDINARY_CLOUD_NAME,
      api_key: AppConfigEnv.CLOUDINARY_API_KEY,
      api_secret: AppConfigEnv.CLOUDINARY_API_SECRET,
    });
  },
  inject: [ConfigService],
};
