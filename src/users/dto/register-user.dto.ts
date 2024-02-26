import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    Matches
  } from 'class-validator';
  
  export class RegisterUserDto {
    @IsEmail()
    @ApiProperty()
    @IsNotEmpty({
        message: 'Email is required',
      })
    email: string;
  
    @IsString()
    @ApiProperty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'password too weak',
    })
    password: string;
  
    @IsString()
    @ApiProperty()
    @IsNotEmpty({
      message: 'Phone is required',
    })
    phone: string;
  }
  