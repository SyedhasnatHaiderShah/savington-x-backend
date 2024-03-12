// create-checkout-session.dto.ts

import { IsUUID, IsString, IsUrl, IsEnum } from 'class-validator';

enum OrderStatus {
  NEW = 'new',
  // Add other possible status values here if needed
}

export class ResponseCreateCheckoutSessionDto {
  @IsString()
  order_id: string;
  @IsString()
  checkout_id: string;
  @IsUrl()
  checkout_url: string;
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
