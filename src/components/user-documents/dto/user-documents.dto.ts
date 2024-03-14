// user-document.dto.ts
import { Multer } from 'multer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDocumentsDto {
  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  quoteId: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: Multer.File;
}
