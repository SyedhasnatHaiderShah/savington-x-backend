// src/coverages/coverages.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoveragesController } from './coverages.controller';
import { CoveragesService } from './coverages.service';
import { Coverage } from './entities/coverages.entity';
import { InsuranceCompany } from '../insurancecompanies/entities/insurancecompany.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coverage, InsuranceCompany])],
  controllers: [CoveragesController],
  providers: [CoveragesService],
})
export class CoveragesModule {}
