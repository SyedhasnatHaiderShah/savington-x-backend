import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
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

  // @ApiOperation({
  //   summary: 'Login as a user',
  // })
  // @UsePipes(ValidationPipe)
  // @UseGuards(LocalAuthGuard)
  // @Post('/login')
  // async login(@Req() req: Request) {
  //   console.log(req)
  //   return await this.authService.login(req.user);
  // }
  @Post('login')
    @HttpCode(200)
    @ApiOkResponse({ type: UserLoginResponseDto })
    login(
        @Body() userLoginRequestDto: UserLoginRequestDto,
    ): Promise<UserLoginResponseDto> {
        return this.authService.login(userLoginRequestDto);
    }
}
