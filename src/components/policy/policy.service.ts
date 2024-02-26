// policy.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from './entities/policy.entity';
import { CreatePolicyDto } from './dto/policy.dto';
import { PolicyDocument } from './entities/policy_document.entity';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private readonly policyRepository: Repository<Policy>,
    // @InjectRepository(PolicyDocument)
    // private readonly policyDocumentRepository: Repository<PolicyDocument>,
  ) {}

  async findAll(): Promise<Policy[]> {
    return await this.policyRepository.find();
  }

  async findOne(id: number): Promise<Policy> {
    return await this.policyRepository.findOne({
        where :{id}
    });
  }

  async create(policyData: CreatePolicyDto): Promise<Policy> {
    const policy = this.policyRepository.create(policyData);
    return await this.policyRepository.save(policy);
  }

//   async update(id: number, policyData: CreatePolicyDto): Promise<Policy> {
//     await this.policyRepository.update(id, policyData);
//     return await this.policyRepository.findOne({
//         where: {id}
//     });
//   }

//   async delete(id: number): Promise<void> {
//     await this.policyRepository.delete(id);
//   }
}
