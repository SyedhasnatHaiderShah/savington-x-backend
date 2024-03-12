// src/file/file.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FileService } from './file.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/constants';
import { FileController } from './file.controller';

import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([File]), 
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  }),
  MulterModule.register({
    dest: './uploads', // Specify the upload directory
  })
],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
