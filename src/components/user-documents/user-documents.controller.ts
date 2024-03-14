// user-documents.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';

import {Multer} from 'multer';
import { UserDocumentsService } from './user-documents.service';
import { UserDocumentsDto } from './dto/user-documents.dto';

@Controller('user-documents')
export class UserDocumentsController {
  constructor(private readonly userDocumentService: UserDocumentsService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  async uploadFile(
    @UploadedFile() file: Multer.File,
    @Body() userDocumentDto: UserDocumentsDto,
  ): Promise<{ isSuccess: boolean; message: string; url?: string }> {
    try {
      const { phoneNumber, email, quoteId } = userDocumentDto;

      if (!file) {
        throw new HttpException('File not provided', HttpStatus.BAD_REQUEST);
      }

      const fileBuffer = file.buffer;
      const fileName = file.originalname;

      // Upload the file to S3
      const fileUrl = await this.userDocumentService.uploadToS3(fileBuffer, fileName);

      // Save user document details to the database
       await this.userDocumentService.create({
        phoneNumber,
        email,
       quoteId,
        fileName,
        fileUrl,
      });
      return { isSuccess: true, message: 'File successfully uploaded', url: fileUrl };
    } catch (error) {
      return { isSuccess: false, message: `Error uploading file: ${error.message || 'Internal Server Error'}` };
    }
  }
}
