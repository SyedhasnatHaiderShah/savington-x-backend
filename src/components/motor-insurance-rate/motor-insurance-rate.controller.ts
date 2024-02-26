// motor-insurance-rate.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { MotorInsuranceRateService } from './motor-insurance-rate.service';
import { MotorInsuranceRate } from './entities/motor-insurance-rate.entity';
import { CreateMotorInsuranceRateDto, GenerateMotorQuoteDto, ResponseDto, UpdateMotorInsuranceRateDto } from './dto/motor-insurance-rate.dto';
import { EncryptionService } from 'src/auth/encryption.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('motor-insurance-rates')
@Controller('motor-insurance-rates')
export class MotorInsuranceRateController {
  constructor(private readonly motorInsuranceRateService: MotorInsuranceRateService
    ,private readonly encryptionService: EncryptionService
    ) {}

  @Post('getMotorQuotation')
  async create(@Body() generateDto: GenerateMotorQuoteDto): Promise<ResponseDto> {
    return this.motorInsuranceRateService.generateQuotation(generateDto);
  }

//   @Get()
//   async findAll(): Promise<MotorInsuranceRate[]> {
//     return this.motorInsuranceRateService.findAll();
//   }

//   @Get(':id')
//   async findById(@Param('id', ParseIntPipe) id: number): Promise<MotorInsuranceRate> {
//     return this.motorInsuranceRateService.findById(id);
//   }

//   @Put(':id')
//   async update(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() updateDto: UpdateMotorInsuranceRateDto,
//   ): Promise<MotorInsuranceRate> {
//     return this.motorInsuranceRateService.update(id, updateDto);
//   }

//   @Delete(':id')
//   async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
//     return this.motorInsuranceRateService.remove(id);
//   }
}
