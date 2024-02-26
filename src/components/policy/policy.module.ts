// policy.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';
import { PolicyDocument } from './entities/policy_document.entity';
import { Policy } from './entities/policy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Policy, PolicyDocument])],
  controllers: [PolicyController],
  providers: [PolicyService ],
})
export class PolicyModule {}
