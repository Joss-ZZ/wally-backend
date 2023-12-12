import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsIn, IsNotEmpty, IsNumber } from 'class-validator';

export class ReqCalculateExchangeDto {
	@ApiProperty()
	@IsDateString()
	@IsNotEmpty()
	date: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	monto: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsIn(['USD', 'EUR', 'PEN'])
	monedaOrigen: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsIn(['USD', 'EUR', 'PEN'])
	monedaDestino: string;
}
