// src/file/file.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, Headers } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { JwtService } from '@nestjs/jwt';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { File } from './entities/file.entity';
import { createWriteStream } from 'fs';

@Controller('file')
@ApiTags('File') // Add Swagger tags
@ApiBearerAuth() // Add Bearer authentication to Swagger documentation
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data') // Specify the content type
  @ApiBody({
    description: 'File upload with user authentication token',
    type: File,
  })
  @ApiCreatedResponse({
    description: 'File successfully uploaded',
  })
  @ApiBadRequestResponse({
    description: 'Invalid request or token',
  })
  async uploadFile(@UploadedFile() file, @Headers('authorization') authToken: string): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    console.log('file:',file)
    if (!file || !file.buffer) {
      throw new BadRequestException('No valid file provided');
    }


    if (!authToken || !authToken.startsWith('Bearer ')) {
      throw new BadRequestException('Invalid token format');
    }

    const token = authToken.split(' ')[1];

    let userId: number;
    let email: string;

    try {
      console.log('token',token)
      const decodedToken : any = this.jwtService.decode(token);
      console.log('decodedToken',decodedToken)
      userId = decodedToken?.sub;
      email = decodedToken?.email;
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }


    const originalName = file.originalname;

    // Use the original file name when saving
    const newFileName = `${originalName}_${Date.now()}`;

    // Use createWriteStream to save the file with the new name
    const writeStream = createWriteStream(`./uploads/${newFileName}`);
    writeStream.write(file.buffer);
    writeStream.end();

    
    const fileUrl = `/uploads/${file.originalName}`;

    await this.fileService.createFile(userId, email, fileUrl);

    return fileUrl;
  }
}
