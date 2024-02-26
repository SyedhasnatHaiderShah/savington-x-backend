// add-on.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { AddOnService } from './addons.service';
import { AddOn } from './entities/addons.entity';
import { CreateAddOnDto, UpdateAddOnDto } from './dto/addons.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('add-ons')
@Controller('add-ons')
export class AddOnController {
  constructor(private readonly addOnService: AddOnService) {}

  // @Get()
  // async findAll(): Promise<AddOn[]> {
  //   return this.addOnService.findAll();
  // }

  @Get('findByInsurance/:insuranceId')
  async findByInsuranceId(@Param('insuranceId', ParseIntPipe) insuranceId: number): Promise<AddOn[]> {
    return this.addOnService.findByInsuranceId(insuranceId);
  }


  @Post()
  async create(@Body() addOnDto: CreateAddOnDto): Promise<AddOn> {
    return this.addOnService.create(addOnDto);
  }

//   @Put(':id')
//   async update(
//     @Param('id') id: number,
//     @Body() addOnDto: UpdateAddOnDto,
//   ): Promise<AddOn> {
//     return this.addOnService.update(id, addOnDto);
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: number): Promise<void> {
//     return this.addOnService.delete(id);
//   }
}
