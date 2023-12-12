import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger';
import { ApiEndpoint, getPathController } from './config/endpoints';
import { ValidationPipe } from '@nestjs/common';
// import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
	// const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
	const app = await NestFactory.create(AppModule);
	app.enableCors();

	// Swagger setup
	const config = new DocumentBuilder()
		.addBearerAuth()
		.setTitle(swaggerConfig.title)
		.setDescription(swaggerConfig.description)
		.setVersion(swaggerConfig.version)
		.setContact(swaggerConfig.contact.name, swaggerConfig.contact.url, swaggerConfig.contact.email);

	Object.values(ApiEndpoint).forEach((tag) => {
		if (tag !== 'swagger') config.addTag(tag);
	});

	const document = SwaggerModule.createDocument(app, config.build());
	SwaggerModule.setup(getPathController(ApiEndpoint.SWAGGER), app, document);

	// Validators
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

	// Usarmos '0.0.0.0' para escuchar en todas las interfaces disponibles IPv4 : Ref: Fastity Documentation
	// await app.listen(3000, '0.0.0.0');
	await app.listen(process.env.APP_PORT);
}
bootstrap();
