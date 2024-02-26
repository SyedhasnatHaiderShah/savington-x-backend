// src/coverages/coverages.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { CoveragesService } from './coverages.service';
import { Coverage } from './entities/coverages.entity';
import { CreateCoverageDto } from './dto/coverages.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('coverages')
@Controller('coverages')
export class CoveragesController {
  constructor(private readonly coveragesService: CoveragesService) {}

  @Post()
  async create(@Body() createCoverageDto: CreateCoverageDto): Promise<Coverage> {
    return this.coveragesService.create(createCoverageDto);
  }

  // @Get()
  // async findAll(): Promise<Coverage[]> {
  //   return this.coveragesService.findAll();
  // }

  @Get('v/:insuranceId')
  async findByInsuranceId(@Param('insuranceId', ParseIntPipe) insuranceId: number): Promise<Coverage[]> {
    return this.coveragesService.findByInsuranceId(insuranceId);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: number): Promise<Coverage[]> {
  //   return this.coveragesService.findByInsuranceId(id);
  // }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateCoverageDto: CreateCoverageDto,
  // ): Promise<Coverage> {
  //   return this.coveragesService.update(+id, updateCoverageDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<void> {
  //   return this.coveragesService.remove(+id);
  // }
}
