import { Injectable, UseGuards } from '@nestjs/common';
import { check } from 'prettier';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { jwtConstants } from 'src/constants/constants';
import Order, { CaptureOrder } from './dto/order.interface';
import { Currency, Status } from 'src/enums/role.enum';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto/create-checkout-session.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { MotorQuoteService } from 'src/components/motor-quote/motor-quote.service';
import { MotorQuote } from 'src/components/motor-quote/entities/motor-quote.entity';
import { User } from 'src/users/entity/users.entity';
import { OrderEntity } from './entities/order.entity/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseCreateCheckoutSessionDto } from './dto/response-create-checkout-session.dto';
// import { TamaraApi } from 'your-tamara-api-client'; // Replace with the actual Tamara API client

@Injectable()
export class TamaraService {
  private tamaraApi: any; // Replace with the actual Tamara API client instance
 

  constructor( 
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly usersService: UsersService ,
    private readonly motorQuoteService : MotorQuoteService
    ) {
    // Initialize the Tamara API client here
    this.tamaraApi = require('api')('@docs-tam/v1.0.0#5s8w1zlrd5evux');
  }

  @UseGuards(JwtAuthGuard)
  async checkPaymentOptions(token , checkPaymentOptions) {
    try {
      // Implement the logic to check payment options using the Tamara API client
      // this.tamaraApi.auth(jwtConstants.tamaraToken);
      // const response = await this.tamaraApi.checkPaymentOptionsAvailability(checkPaymentOptions);      
      // return response.data;

      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer '+jwtConstants.tamaraToken
        },
        body: JSON.stringify(checkPaymentOptions)
      };
      const response = (await fetch('https://'+jwtConstants.url+'.tamara.co/checkout/payment-options-pre-check', options)).json();
      return await response;
    } catch (error) {
      console.log("response.error" , error)
      throw error;
    }
  }

  async createCheckoutSession(createCheckoutSessionDto: CreateCheckoutSessionDto) {
    try {
      // let user = await this.usersService.getUserByEmail(createCheckoutSessionDto.email);

      let { data, isSuccess } = await this.motorQuoteService.findQuotationById(createCheckoutSessionDto.order_id);
  
      if (data.length >= 1 && isSuccess) {
        let quote: MotorQuote = data[0];
        let body: Order = this.createOrderBody(createCheckoutSessionDto, quote);
        console.log('Quotation Founded' , JSON.stringify(body))
  
        // Implement the logic to create a checkout session using the Tamara API client
        // this.tamaraApi.auth(jwtConstants.tamaraToken);
        // const response = await this.tamaraApi.createCheckoutSession(body);

        const options = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer '+jwtConstants.tamaraToken
          },
          body: JSON.stringify(body)
        };

        const response = (await fetch('https://'+jwtConstants.url+'.tamara.co/checkout', options)).json();
        
        // Log response or handle it as needed
        console.log('Response:', await response);
  
        // Save information in the database
        let res =   await this.saveCheckoutSessionInDatabase(createCheckoutSessionDto , await response);
        
        if(res.isSuccess){
          return await response;
        }else{
          return await res;
        }
  
      } else {
        return await {
          "statusCode": 400,
          "message": "No Quotation found. Try to get new Quotation",
          'isSuccess': false,
        };
      }
    } catch (error) {
      // Log detailed error information or handle specific errors
      console.error('Error:', error);
      return error;
    }
  }
  
  private createOrderBody(createCheckoutSessionDto: CreateCheckoutSessionDto, quote: MotorQuote): Order {
    return {
      total_amount: { amount: quote?.quote_amount, currency: Currency.default },
      shipping_amount: { amount: '0', currency: Currency.default },
      tax_amount: { amount: 0, currency: Currency.default },
      order_reference_id: createCheckoutSessionDto.order_reference_id,
      order_number: quote?.id.toString(),
      discount: {name: 'Voucher', amount: {amount: 0, currency: Currency.default}},
      items: [
        {
          name: 'Motor Insurance',
          type: quote?.insurance_type == 1 ? 'Third Party' : 'Comprehensive',
          reference_id: createCheckoutSessionDto.order_reference_id,
          sku: createCheckoutSessionDto.order_reference_id,
          quantity: 1,
          discount_amount: { amount: 0, currency: Currency.default },
          tax_amount: { amount: 0, currency: Currency.default },
          unit_price: { amount: quote?.quote_amount, currency: Currency.default },
          total_amount: { amount: quote?.quote_amount, currency: Currency.default },
        },
      ],
      consumer: {
        email: createCheckoutSessionDto?.email,
        first_name: createCheckoutSessionDto?.first_name,
        last_name: '',
        phone_number: createCheckoutSessionDto?.phone_number,
      },
      country_code: 'AE',
      description: quote?.insurance_type == 1 ? 'Third Party Motor Insurance' : 'Comprehensive Motor Insurance.',
      // merchant_url: {
      //   cancel: 'http://localhost:3000/car-insurance',
      //   failure: 'http://localhost:3000/car-insurance',
      //   success: 'http://localhost:3000/car-insurance',
      //   notification: 'http://localhost:8000/tamara/notification',
      // },
      // merchant_url: {
      //   cancel: 'https://dev.savington-x.ae/car-insurance',
      //   failure: 'https://dev.savington-x.ae/car-insurance',
      //   success: 'https://dev.savington-x.ae/car-insurance',
      //   notification: 'https://dev.savington-x.ae/tamara/notification',
      // },
      merchant_url: {
        cancel: 'https://savington-x.ae/car-insurance',
        failure: 'https://savington-x.ae/car-insurance',
        success: 'https://savington-x.ae/car-insurance',
        notification: 'https://savington-x.ae/tamara/notification',
      },
      payment_type: createCheckoutSessionDto.payment_type,
      instalments: createCheckoutSessionDto.instalments,
      billing_address: {
        city: 'Dubai',
        country_code: 'AE',
        first_name: createCheckoutSessionDto?.first_name,
        last_name: '',
        line1: '119 Al Nasar palza Oud Metha',
        line2: '',
        phone_number: createCheckoutSessionDto?.phone_number,
        region: 'Dubai',
      },
      shipping_address: {
        city: 'Dubai',
        country_code: 'AE',
        first_name: createCheckoutSessionDto?.first_name,
        last_name: '',
        line1: '119 Al Nasar palza Oud Metha',
        line2: '',
        phone_number: createCheckoutSessionDto?.phone_number,
        region: 'Dubai',
      },
      platform: 'Savington',
      is_mobile: false,
      locale: 'en_US',
    };
  }
  private createCaptureOrderBody(createCheckoutSessionDto: CreateCheckoutSessionDto, quote: MotorQuote , order_id: string): CaptureOrder {
    return {
      order_id: order_id,
      total_amount: { amount: quote?.quote_amount, currency: Currency.default },
      items: [
        {
          name: 'Motor Insurance',
          type: quote?.insurance_type == 1 ? 'Third Party' : 'Comprehensive',
          reference_id: createCheckoutSessionDto.order_reference_id,
          sku: createCheckoutSessionDto.order_reference_id,
          quantity: 1,
          discount_amount: { amount: 0, currency: Currency.default },
          tax_amount: { amount: 0, currency: Currency.default },
          unit_price: { amount: quote?.quote_amount, currency: Currency.default },
          total_amount: { amount: quote?.quote_amount, currency: Currency.default },
        },
      ],
      discount_amount: { amount: '0', currency: Currency.default },
      shipping_amount: { amount: '0', currency: Currency.default },
      shipping_info: {
        shipped_at: '',
        shipping_company: '',
        tracking_number: '',
        tracking_url: '',
      },
      tax_amount: { amount: '0', currency: Currency.default },
    };
  }


  async saveCheckoutSessionInDatabase(createCheckoutSessionDto: CreateCheckoutSessionDto, response: ResponseCreateCheckoutSessionDto): Promise<any> {
    try {
        // Check if an order with the same quoteId and status "Paid" already exists
        const existingOrder = await this.orderRepository.findOne({ where: { quoteId: createCheckoutSessionDto.order_id, status: Status.Paid } });

        if (existingOrder) {
          return {
            message : 'This quotation is already Paid. Please try to generate a new quotation.',
            isSuccess : false
          }
        }

        // Create a new instance of the OrderEntity
        const order = new OrderEntity();

        order.quoteId = createCheckoutSessionDto?.order_id;
        order.refId = createCheckoutSessionDto?.order_reference_id;

        order.timestamp = new Date();
        order.userEmail = createCheckoutSessionDto.email;
        order.orderId = response.order_id;
        order.checkoutId = response.checkout_id;
        order.checkoutUrl = response.checkout_url;
        order.status = response.status;

        // Save the order to the database using the 'insert' function
        await this.orderRepository.insert(order);
        return {
          message : 'Successful',
          isSuccess : true
        }
    } catch (error) {
        // Handle database error (log or throw as needed)
        console.error('Error saving order to the database:', error);
        // throw new Error('Unable to save order to the database');
        return {
          message : 'There is an issue with this quotation. Please try again!.',
          isSuccess : false
        }
    }
}

  

  async authoriseOrder(authoriseOrderDto) {
    try {
      // this.tamaraApi.auth(jwtConstants.tamaraToken);
      // const response = await this.tamaraApi.authoriseOrder(authoriseOrderDto);

      // console.log('Authorize OrderDto', authoriseOrderDto)

      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer '+jwtConstants.tamaraToken
        }
      };

      await fetch('https://'+jwtConstants.url+'.tamara.co/orders/'+authoriseOrderDto.order_id+'/authorise', options)
  

      const orderDetails = await this.orderRepository.findOneBy({orderId : authoriseOrderDto.order_id});
      orderDetails.status = Status.Paid;
      await this.orderRepository.save(orderDetails);
      return {isSuccess : true};
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error
        console.error('Unauthorized: Check your API credentials or user permissions.');
      } else {
        // Log other errors
        console.error(error);
      }
      throw {isSuccess : false , message:'There is some issue to authorize Your Order. Dnt worry our team will contact you if needed.'};
    }
    
  }

  async captureOrder(captureOrderDto) {
    try {
      // Implement the logic to capture an order using the Tamara API client
      const response = await this.tamaraApi.captureOrder(captureOrderDto);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
