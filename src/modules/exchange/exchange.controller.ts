import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiEndpoint, getPathController } from 'src/config/endpoints';
import { ReqCalculateExchangeDto } from './dto/req-calculate-exchange.dto';
import { ApiEntityResponse, ApiResponse } from 'src/core/common/api-entity-response';
import { ResCalculateExchangeDto } from './dto/res-calculate-exchange.dto';
import { SaveExchangeRateDto } from './dto/save-exchange-rate.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags(ApiEndpoint.EXCHANGE)
@Controller(getPathController(ApiEndpoint.EXCHANGE))
export class ExchangeController {
	constructor(private readonly exchangeService: ExchangeService) {}

	@Post('')
	async calculateExchangeRate(
		@Body() reqCalculateExchangeDto: ReqCalculateExchangeDto
	): ApiResponse<ResCalculateExchangeDto> {
		return await ApiEntityResponse.response(
			'Tipo de cambio calculado correctamente',
			this.exchangeService.calculateExchangeRate(reqCalculateExchangeDto)
		);
	}

	@Post('saveRates')
	async saveExchangeRates(@Body() saveExchangeRateDto: SaveExchangeRateDto): ApiResponse<void> {
		return await ApiEntityResponse.response(
			'Tipo de cambio calculado correctamente',
			this.exchangeService.saveExchangeRatesToCache(saveExchangeRateDto)
		);
	}
}
