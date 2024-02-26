// motor-insurance-rate.entity.ts
import { InsuranceCompany } from 'src/components/insurancecompanies/entities/insurancecompany.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('motor_insurance_rates_details')
export class MotorInsuranceRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  is_private: boolean;

  @Column({ length: 255 })
  body_type: string;
 

  @Column({ type: 'float' })
  rate: number;

  @Column()
  is_agency: boolean;

  @Column()
  cylinder: number;

  @Column({ type: 'float', nullable: true })
  min_quote_value: number;

  @Column({ nullable: true })
  min_car_est: number;

  @Column({ nullable: true })
  max_car_est: number;

  @Column({ type: 'float', nullable: true })
  min_discount: number;

  @Column({ type: 'float', nullable: true })
  max_discount: number;

  @Column()
  insurance_type: number;
  
  @ManyToOne(() => InsuranceCompany, company => company.id)
  @JoinColumn({ name: 'company_id' }) // Specify the column name explicitly
  company_id: number;
}
