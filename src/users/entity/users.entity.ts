import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';
import { UserType } from './userType.entity';
import { UserStatus } from './userStatus.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'user_uuid', length: 255 })
  userUuid: string;

  @Column({ name: 'user_eid', length: 255 })
  userEid: string;

  @Column({ name: 'user_name_ar', length: 255 })
  userNameAr: string;

  // @ManyToOne(() => UserType, { nullable: true })
  // @Column({ name: 'user_type' })
  // userType: UserType | null;

  @Column({ name: 'user_name_en', length: 255 })
  userNameEn: string;

  @Column({ name: 'user_email', length: 255 })
  userEmail: string;

  @Column({ name: 'user_mobile', length: 20 })
  userMobile: string;

  // @ManyToOne(() => UserStatus, { nullable: true })
  // @Column({ name: 'user_status' })
  // userStatus: UserStatus | null;

  @Column({ name: 'user_password', length: 255 })
  userPassword: string;

  @Column({ name: 'last_login', type: 'date', nullable: true })
  lastLogin: Date | null;

  @Column({ name: 'is_2fa_enabled', default: false })
  isTwoFactorEnabled: boolean;

  @Column({ name: 'pwd_expiration_date', type: 'date', nullable: true })
  pwdExpirationDate: Date | null;
}
