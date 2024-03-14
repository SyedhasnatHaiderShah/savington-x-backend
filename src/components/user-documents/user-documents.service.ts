
// s3.service.ts
import { Injectable } from '@nestjs/common';
import { AwsConfigService } from 'src/config/aws.config';
import { UserDocument } from './entity/user-documents.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserDocumentsService {
  constructor(
    @InjectRepository(UserDocument)
    private readonly userDocumentRepository: Repository<UserDocument>,
    private readonly awsConfigService: AwsConfigService) {}

  async uploadToS3(fileBuffer: Buffer, fileName: string): Promise<string> {
    const params = {
      Bucket: 'user-details-docs',
      Key: fileName,
      Body: fileBuffer,
    };

    const result = await this.awsConfigService.getS3Instance().upload(params).promise();

    return result.Location;
  }

  async create(data: Partial<UserDocument>): Promise<UserDocument> {
    const userDocument = this.userDocumentRepository.create(data);
    return await this.userDocumentRepository.save(userDocument);
  }
}
