
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { User } from '../entity/users.entity';


export class UserLoginResponseDto extends CreateUserDto {
    @ApiProperty()
    token: string;
    @ApiProperty()
    message: string;
    @ApiProperty()
    isSuccess: boolean;

    constructor(user: User, token?: string , isSuccess?: boolean , message?: string) {
        super();
        
        this.token = token;
        this.isSuccess = isSuccess;
        this.message = message;
    }
}
