// motor-insurance-rate.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotorInsuranceRateController } from './motor-insurance-rate.controller';
import { MotorInsuranceRateService } from './motor-insurance-rate.service';
import { MotorInsuranceRate } from './entities/motor-insurance-rate.entity';
import { EncryptionService } from 'src/auth/encryption.service';
import { InsuranceCompany } from '../insurancecompanies/entities/insurancecompany.entity';
import { MotorQuote } from '../motor-quote/entities/motor-quote.entity';
import { AddOn } from '../addons/entities/addons.entity';
import { Coverage } from '../coverages/entities/coverages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MotorInsuranceRate, InsuranceCompany , MotorQuote , AddOn, Coverage])],
  controllers: [MotorInsuranceRateController],
  providers: [MotorInsuranceRateService , EncryptionService],
})
export class MotorInsuranceRateModule {}
