// add-on.entity.ts
import { InsuranceCompany } from 'src/components/insurancecompanies/entities/insurancecompany.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('add_ons')
export class AddOn {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => InsuranceCompany, company => company.id)
  @JoinColumn({ name: 'company_id' }) // Specify the column name explicitly
  company_id: number;

  @Column()
  price: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  code: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  status: number;
}
