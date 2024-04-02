// car-quotation.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { CarQuotationService } from './car-quotation.service';
import { CarQuotationDTO } from './dto/car-quotation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('car-quotation')
@Controller('car-quotation')
export class CarQuotationController {
  constructor(private readonly carQuotationService: CarQuotationService) {}

  @Post()
  async create(@Body() carQuotationDTO: CarQuotationDTO) {
    return await this.carQuotationService.create(carQuotationDTO);
  }

//   @Get()
//   async findAll() {
//     return await this.carQuotationService.findAll();
//   }
}
