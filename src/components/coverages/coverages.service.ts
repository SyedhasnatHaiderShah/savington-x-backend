// src/coverages/coverages.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coverage } from './entities/coverages.entity';
import { CreateCoverageDto } from './dto/coverages.dto';
import { InsuranceCompany } from '../insurancecompanies/entities/insurancecompany.entity';

@Injectable()
export class CoveragesService {
  constructor(
    @InjectRepository(Coverage)
    private readonly coverageRepository: Repository<Coverage>,
    @InjectRepository(InsuranceCompany) // Inject InsuranceCompany repository
    private readonly insuranceCompanyRepository: Repository<InsuranceCompany>,
  
  ) {}

  async create(createCoverageDto: CreateCoverageDto): Promise<Coverage> {
    // console.log('createCoverageDto', createCoverageDto)
    const coverage = this.coverageRepository.create(createCoverageDto);

    const company = await this.insuranceCompanyRepository.findOne({
      where :{ id: createCoverageDto.insurance_id}
    });
    if (!company) {
      throw new HttpException(
          'Insurance Company not found. Please try again ',
          HttpStatus.BAD_REQUEST,
      );
    }
    // Associate the InsuranceCompany with the AddOn
    coverage.company_id = company?.id;

    // console.log('coverage', coverage)
    // delete coverage.id
    // delete coverage.company
    return await this.coverageRepository.save(coverage);
  }

  // async createCoverage(payload: CreateCoverageDto): Promise<Coverage | undefined> {
  //   const { insurance_id, ...coverageData } = payload;

  //   // Fetch the InsuranceCompany by ID
  //   const insuranceCompany = await this.insuranceCompaniesRepository.findOne(insurance_id);

  //   if (!insuranceCompany) {
  //     return undefined; // Handle case where insurance company doesn't exist
  //   }

  //   const coverage = this.coverageRepository.create({
  //     ...coverageData,
  //     insuranceCompany, // Assign the fetched insurance company
  //   });

  //   return this.coverageRepository.save(coverage);
  // }

  // async findAll(): Promise<Coverage[]> {
  //   return await this.coverageRepository.find();
  // }

  async findByInsuranceId(company_id: number): Promise<Coverage[]> {
    console.log('Received Insurance ID:', company_id);
    return await this.coverageRepository.find({
      where: { company_id: company_id },
    });
    // return this.coverageRepository.find({ where: { company: { id: insuranceId } } });
  }

  // async update(ID: number, updateCoverageDto: CreateCoverageDto): Promise<Coverage> {
  //   const { insurance_id, ...coverageData } = updateCoverageDto;
  //   await this.coverageRepository.update(ID, {
  //     ...coverageData,
  //     company: { id: insurance_id }, // Assuming insurance_id is the ID of InsuranceCompanies
  //   });

  //   return this.coverageRepository.findOne({
  //       where : {id : ID}
  //   });
  // }

  // async remove(id: number): Promise<void> {
  //   await this.coverageRepository.delete(id);
  // }
}
