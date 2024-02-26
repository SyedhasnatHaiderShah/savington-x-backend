import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CarDetailRequestDto {
    @ApiProperty()
    readonly make?: string;
    @ApiProperty()
    readonly model?: string
    @ApiProperty()
    readonly year?: string;
    
}
