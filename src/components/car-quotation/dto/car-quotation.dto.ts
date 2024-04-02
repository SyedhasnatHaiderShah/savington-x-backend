// car-quotation.dto.ts

import { IsDateString, IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CarQuotationDTO {
  @ApiProperty()
  @IsNotEmpty()
  carMake: string;

  @ApiProperty()
  @IsNotEmpty()
  carModel: string;

  @ApiProperty()
  @IsNotEmpty()
  carModelYear: string;

  @ApiProperty()
  @IsNotEmpty()
  carSpecs: string;

  @ApiProperty()
  @IsNotEmpty()
  carRegion: string;

  @ApiProperty()
  @IsNotEmpty()
  placeOfRegistration: string;

  @ApiProperty()
  @IsNotEmpty()
  isNewCar: boolean;

  @ApiProperty()
  @IsNotEmpty()
  estimatedCarValue: number;

  @ApiProperty()
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty()
  @IsNumberString()
  yearsWithoutClaims: string;

  @ApiProperty()
  @IsNotEmpty()
  drivingExperience: boolean;
}
