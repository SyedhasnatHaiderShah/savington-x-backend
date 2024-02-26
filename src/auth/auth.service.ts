import { Injectable , HttpException , HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/users.entity';
import { UserLoginRequestDto } from 'src/users/dto/user-login-request.dto';
import { compare } from 'bcrypt';
import { UserLoginResponseDto } from 'src/users/dto/user-login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return await this.usersService.findOne(email, password);
  }

  async signToken(user: User) {
    const payload = { email: user.userEmail, sub: user.userId };
    return {
      ...payload,
      token: this.jwtService.sign(payload, { algorithm: 'HS256' }),
    };
    // return sign(payload, this.jwtPrivateKey, {});
  }

  async login(userLoginRequestDto: UserLoginRequestDto) {
    const email = userLoginRequestDto.email;
    const password = userLoginRequestDto.password;

    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
        throw new HttpException(
            'Invalid email or password.',
            HttpStatus.BAD_REQUEST,
        );
    }

    const isMatch = await compare(password, user.userPassword);
    if (!isMatch) {
        throw new HttpException(
            'Invalid email or password.',
            HttpStatus.BAD_REQUEST,
        );
    }

    const token = await this.signToken(user);
    return new UserLoginResponseDto(user, token.token);
}
}
