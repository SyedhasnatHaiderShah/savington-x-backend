import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { jwtConstants } from 'src/constants/constants';
import { UserDocumentsController } from './user-documents.controller';
import { UserDocumentsService } from './user-documents.service';
import { AwsConfigService } from 'src/config/aws.config';
import { ConfigModule } from '@nestjs/config';
import { UserDocument } from './entity/user-documents.entity';


@Module({
    imports: [TypeOrmModule.forFeature([UserDocument]) ,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),AuthModule , ConfigModule],
    controllers: [UserDocumentsController],
    providers: [UserDocumentsService , AwsConfigService],
    exports: [UserDocumentsService],
  })
  
export class UserDocumentsModule {}
