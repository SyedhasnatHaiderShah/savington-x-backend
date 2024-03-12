import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserLoginResponseDto } from 'src/users/dto/user-login-response.dto';
import { UserLoginRequestDto } from 'src/users/dto/user-login-request.dto';

@ApiTags('User')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


    @Post('login')
    @HttpCode(200)
    @ApiOkResponse({ type: UserLoginResponseDto })
    login(
        @Body() userLoginRequestDto: UserLoginRequestDto,
    ): Promise<UserLoginResponseDto> {
        return this.authService.login(userLoginRequestDto);
    }

    @Get('decode-token')  // Change from Post to Get
    @ApiOperation({ summary: 'Decode and check the validity of a JWT token' })
    @ApiOkResponse({ description: 'Token information', type: Object })
    decodeToken(@Query('token') token: string): Object {
      // You may want to add error handling for invalid tokens
      const decodedToken = this.authService.decodeUser(token);
  
      return decodedToken;
    }
}
