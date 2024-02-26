export class CaptureOrderDto {
    order_id: string;
    total_amount: { amount: number; currency: string };
    shipping_info: {
      shipped_at: string;
      shipping_company: string;
      tracking_number: string;
      tracking_url: string;
    };
    items: Array<{
      name: string;
      type: string;
      reference_id: string;
      sku: string;
      quantity: number;
      discount_amount: { amount: number; currency: string };
      tax_amount: { amount: number; currency: string };
      unit_price: { amount: number; currency: string };
      total_amount: { amount: number; currency: string };
    }>;
    discount_amount: { amount: number; currency: string };
    shipping_amount: { amount: number; currency: string };
    tax_amount: { amount: number; currency: string };
  }
  