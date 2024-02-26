import { Injectable, UseGuards } from '@nestjs/common';
import { check } from 'prettier';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { jwtConstants } from 'src/constants/constants';
// import { TamaraApi } from 'your-tamara-api-client'; // Replace with the actual Tamara API client

@Injectable()
export class TamaraService {
  private tamaraApi: any; // Replace with the actual Tamara API client instance

  constructor() {
    // Initialize the Tamara API client here
    this.tamaraApi = require('api')('@docs-tam/v1.0.0#5s8w1zlrd5evux');
  }

  @UseGuards(JwtAuthGuard)
  async checkPaymentOptions(token , checkPaymentOptions) {
    try {
      // Implement the logic to check payment options using the Tamara API client
      this.tamaraApi.auth(jwtConstants.tamaraToken);
      const response = await this.tamaraApi.checkPaymentOptionsAvailability(checkPaymentOptions);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createCheckoutSession(createCheckoutSessionDto) {
    try {
      // Implement the logic to create a checkout session using the Tamara API client
      this.tamaraApi.auth(jwtConstants.tamaraToken);
      const response = await this.tamaraApi.createCheckoutSession(createCheckoutSessionDto);
      console.log('Error-------' , response)
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async authoriseOrder(authoriseOrderDto) {
    try {
      // Implement the logic to authorize an order using the Tamara API client
      const response = await this.tamaraApi.authoriseOrder(authoriseOrderDto);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
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
