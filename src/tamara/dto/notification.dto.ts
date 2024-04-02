// notification.dto.ts

import { ApiProperty } from "@nestjs/swagger";

export class NotificationDto {
    @ApiProperty()
    order_id: string;
    @ApiProperty()
    order_reference_id: string;
    @ApiProperty()
    order_number: string;
    @ApiProperty()
    event_type: string;
    @ApiProperty()
    data: any[]; // Assuming data is an array of any type
  }
  