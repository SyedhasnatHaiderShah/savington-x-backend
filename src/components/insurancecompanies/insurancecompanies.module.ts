// insurance-company.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuranceCompany } from './entities/insurancecompany.entity';
import { InsuranceCompanyController } from './insurancecompany.controller';
import { InsuranceCompanyService } from './insurancecompany.service';

@Module({
  imports: [TypeOrmModule.forFeature([InsuranceCompany])],
  controllers: [InsuranceCompanyController],
  providers: [InsuranceCompanyService],
})
export class InsuranceCompanyModule {}
