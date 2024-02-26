import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MotorQuoteService } from './motor-quote.service';
import { MotorQuote } from './entities/motor-quote.entity';
import { CreateMotorQuoteDto } from './dto/motor-quote.dto';
import { ResponseDto } from '../motor-insurance-rate/dto/motor-insurance-rate.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('motor-quotes')
@Controller('motor-quotes')
export class MotorQuoteController {
  constructor(private readonly motorQuoteService: MotorQuoteService) {}

//   @Get()
//   async findAll(): Promise<MotorQuote[]> {
//     return this.motorQuoteService.findAll();
//   }

  @Get('getQuotaionList/:id')
  async findAllByQuotationId(@Param('id') id: number): Promise<ResponseDto> {
    return this.motorQuoteService.findAllByQuotationId(id);
  }

  @Post()
  async create(@Body() createMotorQuoteDto: CreateMotorQuoteDto): Promise<MotorQuote> {
    return this.motorQuoteService.insert(createMotorQuoteDto);
  }

//   @Put(':id')
//   async update(
//     @Param('id') id: number,
//     @Body() updateMotorQuoteDto: UpdateMotorQuoteDto,
//   ): Promise<MotorQuote | undefined> {
//     return this.motorQuoteService.update(id, updateMotorQuoteDto);
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: number): Promise<void> {
//     return this.motorQuoteService.delete(id);
//   }
}
