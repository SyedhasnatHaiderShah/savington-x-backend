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
  @ApiProperty()
  driveLicenseAge : number;
  @ApiProperty()
  age : number;
  @ApiProperty()
  year : number;
  @ApiProperty()
  body_type: string;
  @ApiProperty()
  cylinder: number;
  @ApiProperty()
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
  