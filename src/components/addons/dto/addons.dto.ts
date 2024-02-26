import { ApiProperty } from "@nestjs/swagger";

// add-on.dto.ts
export class CreateAddOnDto {
  @ApiProperty()
  price: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  status: number;
  @ApiProperty()
  companyId: number; // Assuming this references the company ID
}

export class UpdateAddOnDto {
    @ApiProperty()
    price?: number;
    @ApiProperty()
    name?: string;
    @ApiProperty()
    code?: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    status?: number;
  }
  