// car-quotation.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarQuotation } from './entities/car-quotation.entity';
import { CarQuotationDTO } from './dto/car-quotation.dto';

@Injectable()
export class CarQuotationService {
  constructor(
    @InjectRepository(CarQuotation)
    private readonly carQuotationRepository: Repository<CarQuotation>,
  ) {}

  async create(carQuotationDTO: CarQuotationDTO): Promise<{ message: string, isSuccess: boolean, id?: string }> {
    try {
      const carQuotation = this.carQuotationRepository.create(carQuotationDTO);
      const savedCarQuotation = await this.carQuotationRepository.save(carQuotation);
      return { message: 'Car quotation created successfully', isSuccess: true, id: savedCarQuotation.id };
    } catch (error) {
        console.log('Error' , error)
      return { message: 'Failed to create car quotation', isSuccess: false };
    }
  }
  
//   async findAll(): Promise<{ message: string, isSuccess: boolean, data?: CarQuotation[] }> {
//     try {
//       const carQuotations = await this.carQuotationRepository.find();
//       return { message: 'Car quotations fetched successfully', isSuccess: true, data: carQuotations };
//     } catch (error) {
//       return { message: 'Failed to fetch car quotations', isSuccess: false };
//     }
//   }

//   async findById(id: string): Promise<{ message: string, isSuccess: boolean, data?: CarQuotation }> {
//     try {
//       const carQuotation = await this.carQuotationRepository.findOne(id);
//       if (!carQuotation) {
//         throw new NotFoundException('Car quotation not found');
//       }
//       return { message: 'Car quotation found successfully', isSuccess: true, data: carQuotation };
//     } catch (error) {
//       return { message: 'Failed to find car quotation', isSuccess: false };
//     }
//   }
}
