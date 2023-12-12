import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class ResponseUserDto extends CreateUserDto {
	@ApiProperty()
	@IsNotEmpty()
	userId: number;
}
