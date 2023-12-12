import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsIn, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class SaveExchangeRateDto {
	@ApiProperty()
	@IsDateString()
	@IsNotEmpty()
	date: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsIn(['USD', 'EUR', 'PEN'])
	baseCurrency: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	PEN: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	EUR: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	USD: number;
}
