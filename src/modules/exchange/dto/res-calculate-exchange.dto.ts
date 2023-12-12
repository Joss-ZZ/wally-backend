import { ApiProperty } from '@nestjs/swagger';
import { ReqCalculateExchangeDto } from './req-calculate-exchange.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ResCalculateExchangeDto extends ReqCalculateExchangeDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	montoTipoCambio: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	tipoCambio: number;
}
