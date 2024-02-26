// policy.entity.ts
import { User } from 'src/users/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { PolicyDocument } from './policy_document.entity';
import { MotorQuote } from 'src/components/motor-quote/entities/motor-quote.entity';

@Entity()
export class Policy {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.userId)
  user_id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  @OneToOne(() => MotorQuote, quote => quote.id)
  quote_id: number;

  @Column({ default: 'active' })
  status: string;

  @Column({ default: false })
  is_deleted: boolean;

}
