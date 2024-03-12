import { Module } from '@nestjs/common';
import { TamaraController } from './tamara.controller';
import { TamaraService } from './tamara.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { MotorQuoteModule } from 'src/components/motor-quote/motor-quote.module';
import { MotorQuoteService } from 'src/components/motor-quote/motor-quote.service';
import { MotorQuote } from 'src/components/motor-quote/entities/motor-quote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity/order.entity';

@Module({
  imports: [
    MotorQuoteModule,
    UsersModule,
    TypeOrmModule.forFeature([OrderEntity]),
  ],
  controllers: [TamaraController],
  providers: [TamaraService],
})
export class TamaraModule {}
