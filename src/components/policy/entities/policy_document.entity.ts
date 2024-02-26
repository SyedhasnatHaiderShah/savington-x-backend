// policy_document.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Policy } from './policy.entity';


@Entity()
export class PolicyDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Policy, policy => policy.id)
  policy_id: number;

  @Column()
  document_type: string;

  @Column()
  document_path: string;

  @Column({ type: 'timestamp' })
  upload_date: Date;
}
