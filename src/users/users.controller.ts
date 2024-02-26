import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UsePipes,
  Req,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  
  @Post('/signup')
  // @ApiOperation({
  //   summary: 'Sign Up as a user',
  // })
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: RegisterUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse()
  async getUser(@Req() request): Promise<any> {
      return this.usersService.getUser(request.user.id);
  }
}
