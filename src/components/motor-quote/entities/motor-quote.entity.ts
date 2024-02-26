import { AddOn } from 'src/components/addons/entities/addons.entity';
import { Coverage } from 'src/components/coverages/entities/coverages.entity';
import { InsuranceCompany } from 'src/components/insurancecompanies/entities/insurancecompany.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('motor_quotes')
export class MotorQuote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  ref_no: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  excess: number;

  @ManyToOne(() => InsuranceCompany, company => company.id)
  company_id: number;

  @Column()
  insurance_type: number;

  @Column()
  quote_amount: number;

  @Column({ type: 'timestamp' })
  quote_date: Date;

  @ManyToMany(() => Coverage)
  @JoinTable()
  coverages: Coverage[];

  @ManyToMany(() => AddOn)
  @JoinTable()
  add_ons: AddOn[];

  @Column({ default: 'active' })
  status: string;

  @Column({ default: false })
  is_deleted: boolean;
}
