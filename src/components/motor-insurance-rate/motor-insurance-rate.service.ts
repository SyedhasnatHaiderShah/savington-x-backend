// motor-insurance-rate.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository, getRepository } from 'typeorm';
import { MotorInsuranceRate } from './entities/motor-insurance-rate.entity';
import { CreateMotorInsuranceRateDto, GenerateMotorQuoteDto, ResponseDto, UpdateMotorInsuranceRateDto } from './dto/motor-insurance-rate.dto';
import { InsuranceCompany } from '../insurancecompanies/entities/insurancecompany.entity';
import { MotorQuote } from '../motor-quote/entities/motor-quote.entity';
import { CreateMotorQuoteDto } from '../motor-quote/dto/motor-quote.dto';
import { AddOn } from '../addons/entities/addons.entity';
import { Coverage } from '../coverages/entities/coverages.entity';

@Injectable()
export class MotorInsuranceRateService {
  constructor(
    @InjectRepository(MotorInsuranceRate)
    private readonly motorInsuranceRateRepository: Repository<MotorInsuranceRate>,
    @InjectRepository(InsuranceCompany)
    private readonly insuranceCompanyRepository: Repository<InsuranceCompany>,
    @InjectRepository(MotorQuote)
    private readonly motorQuoteRepository: Repository<MotorQuote>,
    @InjectRepository(AddOn)
    private readonly addOnRepository: Repository<AddOn>,
    @InjectRepository(Coverage)
    private readonly coverageRepository: Repository<Coverage>,
  ) {}

  async create(createDto: CreateMotorInsuranceRateDto): Promise<MotorInsuranceRate> {
    const motorInsuranceRate = this.motorInsuranceRateRepository.create(createDto);
    return await this.motorInsuranceRateRepository.save(motorInsuranceRate);
  }

  async findAll(): Promise<MotorInsuranceRate[]> {
    return await this.motorInsuranceRateRepository.find();
  }

  async generateQuotation(payload : GenerateMotorQuoteDto): Promise<ResponseDto> {

    let response : any = []
    let message = "Quotation successfully generated."
    let isSuccess = true

    const {body_type , cylinder , car_value , year , age } = payload;
    const thirdPartyQuotation = await this.getThirdPartyQuotation(body_type, cylinder , false, true );
    
    if(!thirdPartyQuotation){
      if(!response || response.length <= 0){
        isSuccess = false,
        message ="No quotation available."
      }

    }
    
    return await {
      data : thirdPartyQuotation,
      isSuccess : isSuccess,
      message: message
    };
  }

  async getThirdPartyQuotation(
    body_type: string,
    cylinder: number,
    is_agency: boolean,
    is_private: boolean,
  ): Promise<any> {
    const result = await this.motorInsuranceRateRepository.findOne({
      where: {
        body_type,
        is_agency,
        is_private,
        cylinder,
      },
    });
    if (result) {
      console.log('Got ')
      const listComp = await this.insuranceCompanyRepository.find({
        where: {
          id: In([2, 3 , 5, 8, 12]),
        },
      });
      // console.log('listComp ', listComp)
  
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      const ref = randomNumber.toString().substring(0, 9);
      

      

      const promises = listComp.map(async (item) => {
        // const [addons , length] = await this.addOnRepository.findAndCount({
        //   where: { company_id : item.id , code : 'TPL' },
        // });
        
        const addons = await this.addOnRepository
        .createQueryBuilder("user")
        .where("user.company_id = :company_id and user.code = :code", { company_id: item.id , code: 'TPL' })
        .getMany();
        
        const coverages = await this.coverageRepository
        .createQueryBuilder("user")
        .where("user.company_id = :company_id and user.code = :code", { company_id: item.id , code: 'TPL' })
        .getMany();

        
        // const coverages = await this.coverageRepository.find({
        //   where: { company_id : item.id , code : 'TPL' },
        // });
        const temp = {
          ref_no: Number(ref),
          excess: 0,
          insurance_type: result.insurance_type,
          quote_amount: result.rate,
          quote_date: new Date(),
          coverages: coverages, 
          add_ons: addons, 
          status: 'active',
          is_deleted: false,
          company_id: item.id,
          company_name: item.name,
          company_logo: item.logo,
        };
        console.log('Ref' , ref)
        await this.motorQuoteRepository.save(temp);
        return temp;
      });
  
      const response = await Promise.all(promises);
      return response;
    }
  
    return null;
  }
  

  async findById(id: number): Promise<MotorInsuranceRate> {
    const motorInsuranceRate = await this.motorInsuranceRateRepository.findOne({
        where :{id}
    });
    if (!motorInsuranceRate) {
      throw new NotFoundException('Motor insurance rate not found');
    }
    return motorInsuranceRate;
  }

//   async update(id: number, updateDto: UpdateMotorInsuranceRateDto): Promise<MotorInsuranceRate> {
//     const motorInsuranceRate = await this.findById(id);
//     // Update the found entity with new data from the DTO
//     Object.assign(motorInsuranceRate, updateDto);
//     return await this.motorInsuranceRateRepository.save(motorInsuranceRate);
//   }

//   async remove(id: number): Promise<void> {
//     const motorInsuranceRate = await this.findById(id);
//     await this.motorInsuranceRateRepository.remove(motorInsuranceRate);
//   }
}
