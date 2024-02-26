import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'user_type' })
  userType: string;

  @Column({ type: 'varchar', length: 255 })
  remarks: string;
}
