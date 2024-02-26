
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { User } from '../entity/users.entity';


export class UserLoginResponseDto extends CreateUserDto {
    @ApiProperty()
    token: string;

    constructor(user: User, token?: string) {
        super();
        
        this.token = token;
    }
}
