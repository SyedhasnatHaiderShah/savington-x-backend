import { CarController } from './cars.controller';
import { Module } from '@nestjs/common';
import { CarService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { Cars } from './entity/cars.entity';
import { EncryptionService } from 'src/auth/encryption.service';

@Module({
  imports: [DatabaseModule , TypeOrmModule.forFeature([Cars])],
  controllers: [CarController],
  providers: [CarService , EncryptionService],
  exports: [CarService],
})
export class CarsModule {}
