import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/constants';

@Module({
  imports: [TypeOrmModule.forFeature([User]) ,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  }),AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})

export class UsersModule {}
