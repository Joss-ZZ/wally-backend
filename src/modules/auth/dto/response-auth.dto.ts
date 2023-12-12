import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from './response-user.dto';

export class ResponseAuthDto {
	@ApiProperty()
	user: ResponseUserDto;

	@ApiProperty()
	token: string;
}
