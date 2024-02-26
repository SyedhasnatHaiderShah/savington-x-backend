// src/coverages/entities/tbl_coverages.entity.ts

import { InsuranceCompany } from 'src/components/insurancecompanies/entities/insurancecompany.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'coverages' })
export class Coverage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  code: string;

  @Column('text')
  description: string;

  @Column()
  status: number;
  
  @ManyToOne(() => InsuranceCompany, company => company.id)
  @JoinColumn({ name: 'company_id' }) // Specify the column name explicitly
  company_id: number;
}
