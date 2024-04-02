import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CarsModule } from './cars/cars.module';
import { CoveragesModule } from './components/coverages/coverages.module';
import { InsuranceCompanyModule } from './components/insurancecompanies/insurancecompanies.module';
import { AddOnService } from './components/addons/addons.service';
import { AddOnModule } from './components/addons/addons.module';
import { MotorInsuranceRateModule } from './components/motor-insurance-rate/motor-insurance-rate.module';
import { MotorQuoteModule } from './components/motor-quote/motor-quote.module';
import { PolicyModule } from './components/policy/policy.module';
import { InsuranceCompanySeeder } from './components/insurancecompanies/entities/insurancecompany.seeder';
import { InsuranceCompany } from './components/insurancecompanies/entities/insurancecompany.entity';
import { TamaraModule } from './tamara/tamara.module';
import { MyModuleModule } from './components/my-module/my-module.module';
import { UserDocumentsModule } from './components/user-documents/user-documents.module';
import { UserDocumentsService } from './components/user-documents/user-documents.service';
import { UserDocumentsController } from './components/user-documents/user-documents.controller';
import { CarQuotationModule } from './components/car-quotation/car-quotation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    CarsModule,
    CoveragesModule,
    InsuranceCompanyModule,
    AddOnModule,
    MotorInsuranceRateModule,
    MotorQuoteModule,
    PolicyModule,
    TypeOrmModule.forFeature([InsuranceCompany]),
    TamaraModule,
    MyModuleModule,
    UserDocumentsModule,
    CarQuotationModule,
    // MulterConfigModule,
  ],
  providers: [InsuranceCompanySeeder],
  controllers: [UserDocumentsController],
})
export class AppModule {}
