import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserLoginRequestDto {
    @ApiProperty({ default: "test1@test.com" })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ default: "Test543@!" })
    @IsString()
    readonly password: string;
}
