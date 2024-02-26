// policy.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { Policy } from './entities/policy.entity';
import { CreatePolicyDto } from './dto/policy.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Policies')
@Controller('policies')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Get()
  async findAll(): Promise<Policy[]> {
    return await this.policyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Policy> {
    return await this.policyService.findOne(id);
  }

  @Post()
  async create(@Body() policyData: CreatePolicyDto): Promise<Policy> {
    return await this.policyService.create(policyData);
  }

  // @Put(':id')
  // async update(@Param('id') id: number, @Body() policyData: CreatePolicyDto): Promise<Policy> {
  //   return await this.policyService.update(id, policyData);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: number): Promise<void> {
  //   await this.policyService.delete(id);
  // }
}
