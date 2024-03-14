// user-document.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  quoteId: number;

  @Column()
  fileName: string;

  @Column()
  fileUrl: string;
}
