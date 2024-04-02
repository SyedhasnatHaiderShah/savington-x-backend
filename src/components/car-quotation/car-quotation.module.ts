// car-quotation.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarQuotationController } from './car-quotation.controller';
import { CarQuotationService } from './car-quotation.service';
import { CarQuotation } from './entities/car-quotation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarQuotation])],
  controllers: [CarQuotationController],
  providers: [CarQuotationService],
})
export class CarQuotationModule {}
