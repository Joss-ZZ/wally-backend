import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMenssage, TypeError } from './api-error.enum';
import { isNumber } from 'class-validator';

export interface ErrorResponse {
	statusCode: HttpStatus;
	typeError: TypeError;
	message: string | string[];
	error: boolean;
	result: null;
}

interface Matchers {
	toBeNull: (error: ErrorMenssage) => void;
	toBeUndefined: (error: ErrorMenssage) => void;
	toBeUndefinedOrNull: (error: ErrorMenssage) => void;
	toBeTruthy: (error: ErrorMenssage) => void;
	toBeFalsy: (error: ErrorMenssage) => void;
	toBeNumber: (error: ErrorMenssage) => void;
}

interface MatchersResult extends Matchers {
	not: Matchers;
}

type EvalType = boolean | (() => boolean);

function _trowError(enumError: ErrorMenssage): void {
	const { message, typeError, status } = enumError;

	const statusCode = status ?? HttpStatus.INTERNAL_SERVER_ERROR;

	const error: ErrorResponse = {
		statusCode,
		error: true,
		typeError,
		message,
		result: null,
	};
	throw new HttpException(error, statusCode);
}

function _trueAssertion<T>(actual: T): Matchers {
	return {
		toBeNull(error: ErrorMenssage): void {
			if (actual === null) _trowError(error);
		},
		toBeUndefined(error: ErrorMenssage): void {
			if (actual === undefined) _trowError(error);
		},
		toBeUndefinedOrNull(error: ErrorMenssage): void {
			if (actual === undefined || actual === null) _trowError(error);
		},
		toBeTruthy(error: ErrorMenssage): void {
			if (actual === true) _trowError(error);
		},
		toBeFalsy(error: ErrorMenssage): void {
			if (actual === false) _trowError(error);
		},
		toBeNumber(error: ErrorMenssage): void {
			if (isNumber(actual)) _trowError(error);
		},
	};
}
function _falzyAssertion<T>(actual: T): Matchers {
	return {
		toBeNull(error: ErrorMenssage): void {
			if (!actual === null) _trowError(error);
		},
		toBeUndefined(error: ErrorMenssage): void {
			if (!actual === undefined) _trowError(error);
		},
		toBeUndefinedOrNull(error: ErrorMenssage): void {
			if (!actual === undefined || !actual === null) _trowError(error);
		},
		toBeTruthy(error: ErrorMenssage): void {
			if (!actual === true) _trowError(error);
		},
		toBeFalsy(error: ErrorMenssage): void {
			if (!actual === false) _trowError(error);
		},
		toBeNumber(error: ErrorMenssage): void {
			if (!isNumber(actual)) _trowError(error);
		},
	};
}

export class ApiException {
	private constructor() {}

	static error(enumError: ErrorMenssage): void {
		_trowError(enumError);
	}

	static eval(assess: EvalType, enumError: ErrorMenssage): void {
		if (typeof assess === 'function') {
			if (assess()) _trowError(enumError);
		} else {
			if (assess) _trowError(enumError);
		}
	}

	static expect<T>(actual: T): MatchersResult {
		return {
			..._trueAssertion(actual),
			not: {
				..._falzyAssertion(actual),
			},
		};
	}
}
