// add-on.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddOn } from './entities/addons.entity';
import { AddOnController } from './addons.controller';
import { AddOnService } from './addons.service';
import { InsuranceCompany } from '../insurancecompanies/entities/insurancecompany.entity';


@Module({
  imports: [TypeOrmModule.forFeature([AddOn , InsuranceCompany])],
  controllers: [AddOnController],
  providers: [AddOnService],
})
export class AddOnModule {}
