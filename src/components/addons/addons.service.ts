// add-on.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddOn } from './entities/addons.entity';
import { CreateAddOnDto, UpdateAddOnDto } from './dto/addons.dto';
import { InsuranceCompany } from '../insurancecompanies/entities/insurancecompany.entity';

@Injectable()
export class AddOnService {
  constructor(
    @InjectRepository(AddOn)
    private readonly addOnRepository: Repository<AddOn>,
    @InjectRepository(InsuranceCompany) // Inject InsuranceCompany repository
    private readonly insuranceCompanyRepository: Repository<InsuranceCompany>,
  
  ) {}

  async findAll(): Promise<AddOn[]> {
    return await this.addOnRepository.find();
  }

  async findById(id: number): Promise<AddOn> {
    const company = await this.addOnRepository.findOne({
      where : {id :id}
    });
    
    if (!company) {
      throw new HttpException(
          'Insurance Company not found. Please try again ',
          HttpStatus.BAD_REQUEST,
      );
    }
    return 
  }
  // async findByInsuranceId(insuranceId: number): Promise<AddOn[]> {
  //   const company = await this.addOnRepository.find({ where: {company : {id : insuranceId}} });
  //   console.log('company' , company)
  //   if (!company) {
  //     throw new HttpException(
  //         'Insurance Company not found. Please try again ',
  //         HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   return company;
  // }
  async findByInsuranceId(company_id: number): Promise<AddOn[]> {
    console.log('Received Insurance ID:', company_id);
    const addons = await this.addOnRepository.find({
      where: { company_id : company_id },
    });
    // console.log('addons' , addons)
    return addons
  }

  async create(addOnDto: CreateAddOnDto): Promise<AddOn> {
    const addOn = this.addOnRepository.create(addOnDto);
    // Retrieve the InsuranceCompany by ID
    const company = await this.insuranceCompanyRepository.findOne({
      where :{ id: addOnDto.companyId}
    });
    if (!company) {
      throw new HttpException(
          'Insurance Company not found. Please try again ',
          HttpStatus.BAD_REQUEST,
      );
    }
    // Associate the InsuranceCompany with the AddOn
    addOn.company_id = company.id;

    // delete addOn.id
    // delete addOn.company

    return await this.addOnRepository.save(addOn);
  }

  async update(id: number, addOnDto: UpdateAddOnDto): Promise<AddOn> {
    await this.addOnRepository.update(id, addOnDto);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.addOnRepository.delete(id);
  }
}
