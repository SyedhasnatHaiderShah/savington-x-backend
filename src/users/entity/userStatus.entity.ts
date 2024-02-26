import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  status: number;

  @Column({ type: 'varchar', length: 255 })
  remarks: string;
}
