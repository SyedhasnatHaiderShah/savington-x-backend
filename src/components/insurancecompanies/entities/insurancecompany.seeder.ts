// insurance-company.seeder.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsuranceCompany } from './insurancecompany.entity';


@Injectable()
export class InsuranceCompanySeeder {
  constructor(
    @InjectRepository(InsuranceCompany)
    private readonly insuranceCompanyRepository: Repository<InsuranceCompany>,
  ) {}

  async seed() {
    const companies = [
      'Tokio marine',
      'Dubai national insurance',
      'Al sagr insurance',
      'Rak insurance',
      'RSA insurance',
      'Sukoon insurance',
      'New India',
      'Watania Takaful',
      'Adam-jee Insurance',
      'Fidelity United',
      'Oriental insurance',
      'Orient Al futaim',
      'Yas Takaful',
      'Ascana takaful',
      'Jordan insurance',
      'Damana insurance',
      'Salama insurance',
      'Alliance Insurance',
      'Arabia Insurance',
      'Itihad Al Watania',
    ];

    for (const companyName of companies) {
      const company = new InsuranceCompany();
      company.name = companyName;

      // Generating sample data for other columns
      company.registerId = Math.random().toString(36).substring(7); // Random string
      company.registerDate = new Date(); // Current date
      company.address = 'Sample Address';
      company.city = 'Sample City';
      company.state = 'Sample State';
      company.zipCode = '12345';
      company.country = 'Sample Country';
      company.phoneNumber = '123-456-7890';
      company.email = 'sample@email.com';
      company.website = 'https://samplewebsite.com';
      company.type = 'Sample Type';
      company.industry = 'Sample Industry';

      await this.insuranceCompanyRepository.save(company);
    }
  }
  // async onModuleInit() {
  //   await this.seed();
  // }
}
