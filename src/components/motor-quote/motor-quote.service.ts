import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MotorQuote } from './entities/motor-quote.entity';
import { CreateMotorQuoteDto, UpdateMotorQuoteDto } from './dto/motor-quote.dto';
import { ResponseDto } from '../motor-insurance-rate/dto/motor-insurance-rate.dto';
import { Status } from 'src/enums/role.enum';

@Injectable()
export class MotorQuoteService {
  constructor(
    // @InjectRepository(MotorQuoteRepository)
    // private readonly motorQuoteRepository: MotorQuoteRepository,
    @InjectRepository(MotorQuote)
    private readonly motorQuoteRepository: Repository<MotorQuote>,
  ) {}

  async findAll(): Promise<MotorQuote[]> {
    return this.motorQuoteRepository.find();
  }

  async findQuotationById(id: number): Promise<ResponseDto> {
    const tempData = await this.motorQuoteRepository.find({
        where :{id}
    });
    let message = "Got Quotation successfully."
    let isSuccess = true
    if(!tempData || tempData.length<=0){
      isSuccess = false,
      message ="No quotation found."
    }
    return {
        data : tempData,
        isSuccess : isSuccess,
        message: message
      };
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

  async markAsPaid(quoteId: number): Promise<Boolean> {
    const quote = await this.motorQuoteRepository.findOneBy({ id: quoteId })
    if (!quote) {
      return false;
    }

    // Assuming "paid" is the status value for paid quotes
    quote.status = Status.Paid;
    this.motorQuoteRepository.save(quote);
    return true
  }
//   async update(id: number, updateMotorQuoteDto: UpdateMotorQuoteDto): Promise<MotorQuote | undefined> {
//     await this.motorQuoteRepository.update(id, updateMotorQuoteDto);
//     return this.findById(id);
//   }

//   async delete(id: number): Promise<void> {
//     await this.motorQuoteRepository.delete(id);
//   }
}
