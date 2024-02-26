// insurance-company.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { InsuranceCompanyService } from './insurancecompany.service';
import { InsuranceCompany } from './entities/insurancecompany.entity';
import { CreateInsuranceCompanyDto, UpdateInsuranceCompanyDto } from './dto/insurancecompany.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
// import { InsuranceCompany } from './insurancecompany.entity';
// import { CreateInsuranceCompanyDto, UpdateInsuranceCompanyDto } from './insurancecompany.dto';

@ApiTags('insurance-companies')
@Controller('insurance-companies')
export class InsuranceCompanyController {
  constructor(private readonly insuranceCompanyService: InsuranceCompanyService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<InsuranceCompany[]> {
    return this.insuranceCompanyService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: number): Promise<InsuranceCompany> {
    return this.insuranceCompanyService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() companyDto: CreateInsuranceCompanyDto): Promise<InsuranceCompany> {
    return this.insuranceCompanyService.create(companyDto);
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() companyDto: UpdateInsuranceCompanyDto,
  // ): Promise<InsuranceCompany> {
  //   return this.insuranceCompanyService.update(id, companyDto);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: number): Promise<void> {
  //   return this.insuranceCompanyService.delete(id);
  // }
}
