// car-quotation.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator


@Entity()
export class CarQuotation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
  carMake: string;

  @Column()
  carModel: string;

  @Column()
  carModelYear: string;

  @Column()
  carSpecs: string;

  @Column()
  carRegion: string;

  @Column()
  placeOfRegistration: string;

  @Column({ type: 'boolean' })
  isNewCar: boolean;

  @Column({ type: 'float' })
  estimatedCarValue: number;

  @Column({ type: 'date' })
  dateOfBirth: Date;
  @Column()
  yearsWithoutClaims: string;

  @Column({ type: 'boolean' })
  drivingExperience: boolean;
}
