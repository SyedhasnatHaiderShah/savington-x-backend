// create-policy.dto.ts
export class CreatePolicyDto {
    readonly user_id: number;
    readonly name: string;
    readonly start_date: Date;
    readonly end_date: Date;
    readonly description: string;
    readonly quote_id: number;
    readonly status: string;
    readonly is_deleted: boolean;
  }
  
  // create-policy-document.dto.ts
  export class CreatePolicyDocumentDto {
    readonly policy_id: number;
    readonly document_type: string;
    readonly document_path: string;
    readonly upload_date: Date;
  }
  