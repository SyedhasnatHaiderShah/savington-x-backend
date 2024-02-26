import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarService } from './cars.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Cars } from './entity/cars.entity';import { CarDetailDto } from './dto/cars.dto';
import { EncryptionService } from 'src/auth/encryption.service';


@ApiTags('Car')
@Controller('car')
export class CarController {
  constructor(private readonly CarsService: CarService , private readonly encryptionService: EncryptionService) {}

  @Get('/all')
  @ApiOperation({
    summary: 'Find all Cars',
  })
  // @Role/s(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Cars[]> {
    return await this.CarsService.findAll();
  }

  @Post('/carDetails')
  // @UseGuards(JwtAuthGuard)
  async create(@Body() carDetailDto: CarDetailDto) {
    const resData = await this.CarsService.findCarDetails(carDetailDto);
    // const { encryptedData, iv } = this.encryptionService.encryptData(resData);
    const response = {
      isSuccess : true,
      data : resData,
      // iv : iv,
    };
    return response;
  }
}
