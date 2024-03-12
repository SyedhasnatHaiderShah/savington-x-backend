import { ApiProperty } from "@nestjs/swagger";

// create-motor-insurance-rate.dto.ts
export class CreateMotorInsuranceRateDto {
    is_private: boolean;
    body_type: string;
    rate: number;
    is_agency: boolean;
    cylinder: number;
    min_quote_value?: number;
    min_car_est?: number;
    max_car_est?: number;
    min_discount?: number;
    max_discount?: number;
    insurance_type: number;
    company_id: number;
  }

  // update-motor-insurance-rate.dto.ts
  export class UpdateMotorInsuranceRateDto {
    is_private?: boolean;
    body_type?: string;
    rate?: number;
    is_agency?: boolean;
    cylinder?: number;
    min_quote_value?: number;
    min_car_est?: number;
    max_car_est?: number;
    min_discount?: number;
    max_discount?: number;
    insurance_type?: string;
    company_id?: number;
  }


export class GenerateMotorQuoteDto {
  @ApiProperty({default : 5})
  driveLicenseAge : number;
  @ApiProperty({default : 30})
  age : number;
  @ApiProperty({default : 2023})
  year : number;
  @ApiProperty({default : 'saloon'})
  body_type: string;
  @ApiProperty({default : 4})
  cylinder: number;
  @ApiProperty({default : 30000})
  car_value: number;
}
export class ResponseDto {
  @ApiProperty()
  data: any[] | any ;
  @ApiProperty()
  isSuccess: boolean;
  @ApiProperty()
  message: string;
}
  