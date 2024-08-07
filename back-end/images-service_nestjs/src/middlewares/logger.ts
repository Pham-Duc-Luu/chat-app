import { Module } from '@nestjs/common';
import Logger from 'src/lib/logger';

@Module({
  providers: [
    {
      provide: 'winston',
      useValue: Logger,
    },
  ],
  exports: ['winston'],
})
export class LoggerModule {}
