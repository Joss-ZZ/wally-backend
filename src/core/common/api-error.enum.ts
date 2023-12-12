import { HttpStatus } from '@nestjs/common';

export enum TypeError {
	Information = 'I',
	Warning = 'W',
	Error = 'E',
}

export interface ErrorMenssage {
	message: string;
	typeError: TypeError;
	status?: HttpStatus;
}

export class EnumApiError {
	private constructor() {}

	// Auth
	static get U001(): ErrorMenssage {
		return {
			message: 'Usuario/Contraseña incorrecta',
			typeError: TypeError.Warning,
			status: HttpStatus.FORBIDDEN,
		};
	}

	// Exchange
	static get E001(): ErrorMenssage {
		return {
			message: 'El tipo de cambio no existe para la fecha ingresada',
			typeError: TypeError.Warning,
		};
	}
}
