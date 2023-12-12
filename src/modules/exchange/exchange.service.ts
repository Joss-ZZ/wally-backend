import { Inject, Injectable } from '@nestjs/common';
import { ReqCalculateExchangeDto } from './dto/req-calculate-exchange.dto';
import { ResCalculateExchangeDto } from './dto/res-calculate-exchange.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ExchangeRateService } from './exchange-rate.service';
import { SaveExchangeRateDto } from './dto/save-exchange-rate.dto';
import { ApiException } from 'src/core/common/api-exception-error';
import { EnumApiError } from 'src/core/common/api-error.enum';

@Injectable()
export class ExchangeService {
	private readonly cacheKeyPrefix = 'exchangeRates_';
	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private readonly _exchangeRateService: ExchangeRateService
	) {}

	async calculateExchangeRate(
		reqCalculateExchangeDto: ReqCalculateExchangeDto
	): Promise<ResCalculateExchangeDto> {
		const exchangeRateDto = await this.getExchangeRatesByDate(
			reqCalculateExchangeDto.date,
			reqCalculateExchangeDto.monedaOrigen
		);

		ApiException.expect(exchangeRateDto).toBeNull(EnumApiError.E001);

		const tipoCambio = exchangeRateDto ? exchangeRateDto[reqCalculateExchangeDto.monedaDestino] : 0;
		const montoTipoCambio = reqCalculateExchangeDto.monto * tipoCambio;

		const resCalculateExchangeDto: ResCalculateExchangeDto = {
			...reqCalculateExchangeDto,
			tipoCambio,
			montoTipoCambio,
		};

		return resCalculateExchangeDto;
	}

	async saveExchangeRatesToCache(saveExchangeRateDto: SaveExchangeRateDto): Promise<void> {
		const cacheKey = `${this.cacheKeyPrefix}${saveExchangeRateDto.date}_${saveExchangeRateDto.baseCurrency}`;
		await this.cacheManager.set(cacheKey, saveExchangeRateDto);
	}

	async getExchangeRatesByDate(
		date: string,
		baseCurrency: string
	): Promise<SaveExchangeRateDto | null> {
		const cacheKey = `${this.cacheKeyPrefix}${date}_${baseCurrency}`;
		return await this.cacheManager.get(cacheKey);
	}
}
