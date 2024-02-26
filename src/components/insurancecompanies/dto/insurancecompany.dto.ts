import { ApiProperty } from "@nestjs/swagger";

// insurance-company.dto.ts
export class CreateInsuranceCompanyDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  registerId: string;
  @ApiProperty()
  registerDate: Date;
  @ApiProperty()
  address: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  zipCode: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  website: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  industry: string;
  @ApiProperty()
  logo: string;
}

export class UpdateInsuranceCompanyDto {
  name?: string;
  registerId?: string;
  registerDate?: Date;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: number;
  phoneNumber?: string;
  email?: string;
  website?: string;
  type?: string;
  industry?: string;
}
