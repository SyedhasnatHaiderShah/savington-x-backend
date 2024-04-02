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
  Headers,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserProfileDto } from './dto/update-user-profile';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService ) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: RegisterUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse()
  async getUser( @Headers('Authorization') authorizationHeader: string): Promise<any> {
      return this.usersService.getUser(authorizationHeader);
  }

  @Post(':id/profile')
  updateUserProfile(@Param('id') userId: number, @Body() updateProfileDto: UpdateUserProfileDto) {
    return this.usersService.updateUserProfile(userId, updateProfileDto);
  }


  // @Post(':userId')
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: './uploads', // Specify your upload directory
  //     filename: (req, file, callback) => {
  //       const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
  //       return callback(null, `${randomName}${extname(file.originalname)}`);
  //     },
  //   }),
  // }))
  // uploadFile(@Param('userId') userId: number, @UploadedFile() file: Express.Multer.File) {
  //   const fileUrl = `/uploads/${file.filename}`;
  //   return this.fileService.createFile(fileUrl, userId);
  // }
}
