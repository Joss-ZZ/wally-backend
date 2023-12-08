import { HttpStatus, Type } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export const swaggerConfig = {
	title: 'Wally App',
	description: 'The  API description',
	version: '1.0.0',
	contact: {
		name: 'Jhosimar ZZ',
		url: 'https://github.com/Joss-ZZ',
		email: 'coderjzz@gmail.com',
	},
};

export function response200<T>(type: Type<T>, description?: string): ApiResponseOptions {
	return {
		status: HttpStatus.OK,
		type,
		description,
	};
}
