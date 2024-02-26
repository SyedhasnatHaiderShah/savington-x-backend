import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CarDetailDto {
  @ApiProperty()
  make: string;
  @ApiProperty()
  model: string
  @ApiProperty()
  year: string;
}

