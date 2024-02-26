// src/coverages/dto/coverage.dto.ts

import { ApiProperty } from "@nestjs/swagger";

export class CreateCoverageDto {
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
    insurance_id: number; // For referencing the company
  }
  