import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	username: string;

	@ApiProperty()
	@Exclude()
	@IsString()
	password: string;
}
