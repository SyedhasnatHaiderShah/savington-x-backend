import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ type: 'varchar', length: 255, nullable: false })
  userEmail: string;

  @Column({nullable: false })
  quoteId: number;
  
  @Column({ type: 'varchar', length: 255, nullable: false })
  refId: string;

  @Column({ type: 'varchar', nullable: false, name: 'orderId' }) // Use 'name' property to specify the column name
  orderId: string;

  @Column({ type: 'varchar', nullable: false, name: 'checkoutId' })
  checkoutId: string;

  @Column({ type: 'varchar', nullable:  false, name: 'checkoutUrl' })
  checkoutUrl: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  status: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

}
