import { Controller, Post, Body, Get, Req , Headers, Query  } from '@nestjs/common';
import { Request } from 'express'; // Import Request from 'express'
import { TamaraService } from './tamara.service';
import { CheckPaymentOptionsDto, CreateCheckoutSessionDto } from './dto/create-checkout-session.dto/create-checkout-session.dto';
import { AuthoriseOrderDto } from './dto/authorise-order.dto/authorise-order.dto';
import { CaptureOrderDto } from './dto/capture-order.dto/capture-order.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('tamara')
@ApiTags('Tamara')
// @ApiBearerAuth('accessToken')
export class TamaraController {
  constructor(private readonly tamaraService: TamaraService) {}

  @Post('check-payment-options') 
  async checkPaymentOptions(@Req() request: Request, @Body() checkPaymentOptions: CheckPaymentOptionsDto) {
    const token = request.headers.authorization?.split(' ')[1]; // Assuming Bearer token in the Authorization header

    console.log('In Controller', checkPaymentOptions);
    return await this.tamaraService.checkPaymentOptions(token, checkPaymentOptions);
  }

  @Post('create-session')
  async createCheckoutSession(
    @Body() createCheckoutSessionDto: CreateCheckoutSessionDto,
    @Headers('Authorization') authorizationHeader: string,
  ) {
    return await this.tamaraService.createCheckoutSession(createCheckoutSessionDto);
  }
  @Get('authorise-order')
  async authoriseOrder(@Query('order_id') orderId: string) {
    return await this.tamaraService.authoriseOrder({ order_id: orderId });
  }

  @Post('capture-order')
  async captureOrder(@Body() captureOrderDto: CaptureOrderDto) {
    return await this.tamaraService.captureOrder(captureOrderDto);
  }
}
