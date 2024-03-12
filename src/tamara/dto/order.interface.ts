// file: order.interface.ts

interface Amount {
    amount: number | string;
    currency: string;
  }
  
  interface Discount {
    name?: string;
    amount?: Amount;
  }
  
  interface Item {
    name: string;
    type: string;
    reference_id: string;
    sku: string;
    quantity: number;
    discount_amount: Amount;
    tax_amount: Amount;
    unit_price: Amount;
    total_amount: Amount;
  }
  
  interface Consumer {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
  }
  
  interface MerchantUrl {
    cancel: string;
    failure: string;
    success: string;
    notification: string;
  }
  
  interface BillingAddress {
    city: string;
    country_code: string;
    first_name: string;
    last_name: string;
    line1: string;
    line2: string;
    phone_number: string;
    region: string;
  }
  
  interface ShippingAddress {
    city: string;
    country_code: string;
    first_name: string;
    last_name: string;
    line1: string;
    line2: string;
    phone_number: string;
    region: string;
  }
  
  interface RiskAssessment {
    customer_age: number;
    customer_dob: string;
    customer_gender: string;
    customer_nationality: string;
    is_premium_customer: boolean;
    is_existing_customer: boolean;
    is_guest_user: boolean;
    account_creation_date: string;
    platform_account_creation_date: string;
    date_of_first_transaction: string;
    is_card_on_file: boolean;
    is_COD_customer: boolean;
    has_delivered_order: boolean;
    is_phone_verified: boolean;
    is_fraudulent_customer: boolean;
    total_ltv: number;
    total_order_count: number;
    order_amount_last3months: number;
    order_count_last3months: number;
    last_order_date: string;
    last_order_amount: number;
    reward_program_enrolled: boolean;
    reward_program_points: number;
  }
  
  interface AdditionalData {
    delivery_method: string;
    pickup_store: string;
    store_code: string;
    vendor_amount: number;
    merchant_settlement_amount: number;
    vendor_reference_code: string;
  }
  
  export interface Order {
    total_amount: Amount;
    shipping_amount: Amount;
    tax_amount: Amount;
    order_reference_id: string;
    order_number: string;
    discount?: Discount;
    items: Item[];
    consumer: Consumer;
    country_code: string;
    description: string;
    merchant_url: MerchantUrl;
    payment_type: string;
    instalments: number;
    billing_address: BillingAddress;
    shipping_address: ShippingAddress;
    platform: string;
    is_mobile: boolean;
    locale: string;
    risk_assessment?: RiskAssessment;
    additional_data?: AdditionalData;
  }
  
  export default Order;
  