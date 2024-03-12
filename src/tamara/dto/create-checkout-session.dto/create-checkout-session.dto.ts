import { ApiProperty } from "@nestjs/swagger";


// types.ts
export class TotalAmount {
  @ApiProperty({ default: 100 })
  amount: number;
  @ApiProperty({ default: 'AED' })
  currency: string;
}

export class DiscountAmount {
  @ApiProperty({ default: 0 })
  amount: number;
  @ApiProperty({ default: 'AED' })
  currency: string;
}

export class Item {
  @ApiProperty({ default: "Insurance" })
  name: string;

  @ApiProperty({ default: "Third party" })
  type: string;

  @ApiProperty({ default: "Q1223213" })
  reference_id: string;

  @ApiProperty({ default: "SKU-213213" })
  sku: string;

  @ApiProperty({ default: 1 })
  quantity: number;

  discount_amount: DiscountAmount;
  total_amount: TotalAmount;
}

export class Consumer {
  @ApiProperty({ default: 'hasnathaider332@gmail.com' })
  email: string;
  @ApiProperty({ default: 'Syed' })
  first_name: string;
  @ApiProperty({ default: 'Shah' })
  last_name: string;
  @ApiProperty({ default: '568468089' })
  phone_number: string;
}



export class CreateCheckoutSessionDto {
  @ApiProperty({ default: "Test" })
  first_name: string;
  @ApiProperty({ default: "568768899" })
  phone_number: string;
  @ApiProperty({ default: "test1@test.com" })
  email: string;
  @ApiProperty({ default: "35897" })
  order_reference_id: string;
  @ApiProperty({ default: 3762 })
  order_id: number;
  @ApiProperty({ default: "PAY_BY_INSTALMENTS" })
  payment_type: string;
  @ApiProperty({ default: 4 })
  instalments: number;
}





class orderValue { 
    @ApiProperty({ default: 100})
    amount: number;
    @ApiProperty({ default: 'AED' })
    currency: string
}
  
  
export class CheckPaymentOptionsDto {
    @ApiProperty({ default: 'AE' })
    country: string;
    
    @ApiProperty({ default: '568001234' })
    phone_number: string;
    
    @ApiProperty()
    order_value: orderValue;
    
    @ApiProperty({ default: false })
    is_vip: boolean;
  }

