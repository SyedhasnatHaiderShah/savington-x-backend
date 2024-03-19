// aws.config.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsConfigService {
  private readonly s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      accessKeyId: this.configService.get<string>('A_ID')+this.configService.get<string>('KEY_ID'),
      secretAccessKey: this.configService.get<string>('S_ID')+this.configService.get<string>('KEY'),
      region: this.configService.get<string>('REGION'),
    });

    this.s3 = new AWS.S3();
  }

  getS3Instance(): AWS.S3 {
    return this.s3;
  }
}
