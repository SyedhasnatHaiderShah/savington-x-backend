// insurance-company.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsuranceCompany } from './entities/insurancecompany.entity';
import { CreateInsuranceCompanyDto, UpdateInsuranceCompanyDto } from './dto/insurancecompany.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';


@Injectable()
export class InsuranceCompanyService {
  constructor(
    @InjectRepository(InsuranceCompany)
    private readonly insuranceCompanyRepository: Repository<InsuranceCompany>,
  ) {}

  async findAll(): Promise<InsuranceCompany[]> {
    return await this.insuranceCompanyRepository.find();
  }

  async findById(id: number): Promise<InsuranceCompany> {
    return await this.insuranceCompanyRepository.findOne({
      where : {id : id}
    });
  }

  async create(companyDto: CreateInsuranceCompanyDto): Promise<InsuranceCompany> {
    const newCompany = new InsuranceCompany(); // Creating a new instance of the entity

    newCompany.name = companyDto.name;
    newCompany.registerId = companyDto.registerId;
    newCompany.registerDate = companyDto.registerDate;
    newCompany.address = companyDto.address; 
    newCompany.city = companyDto.city;
    newCompany.state = companyDto.state;
    newCompany.zipCode = companyDto.zipCode;
    newCompany.country = companyDto.country;
    newCompany.phoneNumber = companyDto.phoneNumber;
    newCompany.email = companyDto.email;
    newCompany.website = companyDto.website;
    newCompany.industry = companyDto.industry;
    newCompany.type = companyDto.type;

    // Save the new entity to the database
    const created = await this.insuranceCompanyRepository.save(newCompany);
    delete created.id
    delete created.registerId
    return created 
  }
  
  async update(id: number, companyDto: UpdateInsuranceCompanyDto): Promise<InsuranceCompany> {
    const updatedCompany: QueryDeepPartialEntity<InsuranceCompany> = {};

    // Check if properties exist in the DTO and assign them to the update object
    if (companyDto.name) updatedCompany.name = companyDto.name;
    if (companyDto.registerId) updatedCompany.registerId = companyDto.registerId;
    // Add other properties in a similar way...

    await this.insuranceCompanyRepository.update(id, updatedCompany);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.insuranceCompanyRepository.delete(id);
  }
}
