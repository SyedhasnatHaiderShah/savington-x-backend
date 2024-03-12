// src/file/file.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    private jwtService: JwtService,
  ) {}

 

  async createFile(userId: number, email: string, url: string): Promise<File> {
    const file = this.fileRepository.create({ userId, email, url });
    return await this.fileRepository.save(file);
  }
}
