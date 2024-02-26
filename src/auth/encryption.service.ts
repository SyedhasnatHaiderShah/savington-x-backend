import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly passphrase = 'iamsmart@savingtonx@insurance@broker'; // Passphrase used to derive key

  // Function to derive a 32-byte key using PBKDF2
  private deriveKey(): Buffer {
    const salt = crypto.randomBytes(16); // Generate a random salt
    const key = crypto.pbkdf2Sync(this.passphrase, salt, 100000, 32, 'sha256');
    return key;
  }

  encryptData(data: object): { encryptedData: string, iv: string } {
    const jsonString = JSON.stringify(data);
    const iv = crypto.randomBytes(16);

    const key = this.deriveKey(); // Derive the key using PBKDF2

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    let encryptedData = cipher.update(jsonString, 'utf8', 'base64');
    encryptedData += cipher.final('base64');

    return {
      encryptedData,
      iv: iv.toString('base64'),
    };
  }
}
