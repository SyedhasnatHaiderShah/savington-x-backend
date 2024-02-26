import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Cars } from '../entity/cars.entity';

export class CarDetailResponseDto {
    @ApiProperty()
     makes: string[];
    @ApiProperty()
     models: string[]
    @ApiProperty()
     years: string[];
    @ApiProperty()
     descriptions: Cars[];
}
