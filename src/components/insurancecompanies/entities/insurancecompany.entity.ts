// insurance-company.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class InsuranceCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'register_id', length: 20, nullable: true })
  registerId: string;

  @Column({ name: 'register_date', type: 'date', nullable: true })
  registerDate: Date;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  state: string;

  @Column({ name: 'zip_code', length: 10 })
  zipCode: string;

  @Column({ length: 255 })
  country: string;

  @Column({ name: 'phone_number', length: 20 })
  phoneNumber: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 50 })
  website: string;

  @Column({ length: 100 })
  type: string;

  @Column({ length: 100 })
  industry: string;
  
  @Column({ length: 255 })
  logo: string;
}
