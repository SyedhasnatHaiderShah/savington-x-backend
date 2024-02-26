import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MotorQuote } from './entities/motor-quote.entity';
import { CreateMotorQuoteDto, UpdateMotorQuoteDto } from './dto/motor-quote.dto';
import { ResponseDto } from '../motor-insurance-rate/dto/motor-insurance-rate.dto';

@Injectable()
export class MotorQuoteService {
  constructor(
    @InjectRepository(MotorQuote)
    private readonly motorQuoteRepository: Repository<MotorQuote>,
  ) {}

  async findAll(): Promise<MotorQuote[]> {
    return this.motorQuoteRepository.find();
  }

  async findAllByQuotationId(q_id: number): Promise<ResponseDto> {
    const tempData = await this.motorQuoteRepository.find({
        where :{ref_no : q_id}
    });


    let message = "Quotation successfully generated."
    let isSuccess = true
    if(!tempData || tempData.length<=0){
      isSuccess = false,
      message ="No quotation available."
    }

    return {
        data : tempData,
        isSuccess : isSuccess,
        message: message
      };
  }

  async insert(createMotorQuoteDto: CreateMotorQuoteDto): Promise<MotorQuote> {
    const motorQuote = this.motorQuoteRepository.create(createMotorQuoteDto);
    return this.motorQuoteRepository.save(motorQuote);
  }

//   async update(id: number, updateMotorQuoteDto: UpdateMotorQuoteDto): Promise<MotorQuote | undefined> {
//     await this.motorQuoteRepository.update(id, updateMotorQuoteDto);
//     return this.findById(id);
//   }

//   async delete(id: number): Promise<void> {
//     await this.motorQuoteRepository.delete(id);
//   }
}
