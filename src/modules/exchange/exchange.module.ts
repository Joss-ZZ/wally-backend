import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';
import { ExchangeRateService } from './exchange-rate.service';
// import { HttpModule } from '@nestjs/axios';

@Module({
	// imports: [HttpModule],
	controllers: [ExchangeController],
	providers: [ExchangeService, ExchangeRateService],
})
export class ExchangeModule {}
