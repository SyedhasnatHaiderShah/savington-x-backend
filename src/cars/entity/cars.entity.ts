import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cars')
export class Cars {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'min_price', nullable: true })
  minPrice: number;

  @Column({ name: 'avg_price', nullable: true })
  avgPrice: number;

  @Column({ name: 'max_price', nullable: true })
  maxPrice: number;

  @Column({ nullable: true })
  spec: string;

  @Column({ name: 'engine_size', nullable: true })
  engineSize: string;

  @Column({ name: 'no_of_cyls', nullable: true })
  noOfCyls: string;

  @Column({ nullable: true })
  hp: string;

  @Column({ name: 'body_type', nullable: true })
  bodyType: string;

  @Column({ nullable: true })
  transmission: string;

  @Column({ nullable: true })
  doors: string;

  @Column({ nullable: true })
  seats: string;

  @Column({ name: 'final_drive', nullable: true })
  finalDrive: string;

  @Column({ name: 'vehicle_type', nullable: true })
  vehicleType: string;

  @Column({ nullable: true })
  make: string;

  @Column({ nullable: true })
  model: string;

  @Column({ nullable: true })
  year: string;
}
