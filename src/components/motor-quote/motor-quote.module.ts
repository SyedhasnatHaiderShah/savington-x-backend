import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotorQuoteController } from './motor-quote.controller';
import { MotorQuoteService } from './motor-quote.service';
import { Coverage } from '../coverages/entities/coverages.entity';
import { AddOn } from '../addons/entities/addons.entity';
import { MotorQuote } from './entities/motor-quote.entity';
import { EncryptionService } from 'src/auth/encryption.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MotorQuote, Coverage, AddOn]),
  ],
  controllers: [MotorQuoteController],
  providers: [MotorQuoteService , EncryptionService],
  exports: [MotorQuoteService],
})
export class MotorQuoteModule {}
