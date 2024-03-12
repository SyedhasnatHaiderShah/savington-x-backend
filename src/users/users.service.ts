import { Injectable ,HttpException ,HttpStatus, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { genSalt, hash, compare } from 'bcrypt';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserProfileDto } from './dto/update-user-profile';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: RegisterUserDto) {
      const isUser = await this.getUserByEmail(createUserDto.email);
      console.log(!isUser)
      if (!!isUser) {
            throw new HttpException(
                'User Already Exist. Please try to login',
                HttpStatus.BAD_REQUEST,
            );
      }

      const user = new User();
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      user.userEmail = createUserDto.email;
      user.userPassword = hashPassword;
      user.userEid = '';
      user.userUuid = '';
      user.userNameEn = '';
      user.userNameAr = '';
      user.userMobile = createUserDto.phone;
      // user.role = createUserDto.role;
      const createdUser = await this.userRepository.save(user);
      
      delete createdUser.userId
      delete createdUser.userPassword
      return createdUser
    
  }

  async findOne(email: string, password: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { userEmail : email },
      });
      const isMatch = await bcrypt.compare(password, user.userPassword);
      if (user && isMatch) {
        return user;
      } else {
        throw new Error(`User not found`);
      }
    } catch (err) {
      throw new Error(`Error finding ${err} user ${err.message}`);
    }
  }
  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
        where: { userEmail: email },
    });
}
async getUser(authorizationHeader: any ) {
  let userData = await this.jwtService.verify(authorizationHeader.replace('Bearer ',''));
  const user = await this.userRepository.findOne({
    where: { userEmail: userData?.email},
});
  if (!user) {
      throw new HttpException(
          'User not found',
          HttpStatus.NOT_FOUND,
      );
  }
  delete user.userPassword;
  delete user.userId;
  return user;
}

async updateUserProfile(userId: number, updateProfileDto: UpdateUserProfileDto): Promise<User> {
  const user = await this.userRepository.findOne({
    where: { userId: userId },
});

  if (!user) {
    throw new NotFoundException('User not found');
  }

  // Update the user profile fields
  Object.assign(user, updateProfileDto);

  // Save the updated user profile
  return this.userRepository.save(user);
}
    
}

export interface JwtPayload {
  email: string;
  iat?: Date;
}
