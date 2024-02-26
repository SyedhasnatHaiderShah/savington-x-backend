import { AddOn } from "src/components/addons/entities/addons.entity";
import { Coverage } from "src/components/coverages/entities/coverages.entity";

// create-motor-quote.dto.ts
export class CreateMotorQuoteDto {
    // Fields from the schema, adjust types as needed
    ref_no: number;
    excess: number;
    company_id: number;
    insurance_type: number;
    quote_amount: number;
    quote_date: Date;
    coverages: Coverage[]; // Array of coverage IDs for many-to-many relationship
    add_ons: AddOn[]; // Array of add-on IDs for many-to-many relationship
    status?: string;
    is_deleted?: boolean;
  }
  
  // update-motor-quote.dto.ts
  export class UpdateMotorQuoteDto {
    // Fields that can be updated, adjust types as needed
    ref_no?: number;
    excess?: number;
    company_id?: number;
    insurance_type?: string;
    quote_amount?: string;
    quote_date?: Date;
    coverages?: number[]; // Array of coverage IDs for many-to-many relationship
    add_ons?: number[]; // Array of add-on IDs for many-to-many relationship
    status?: string;
    is_deleted?: boolean;
  }
  