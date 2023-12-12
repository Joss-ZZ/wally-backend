import { EntityResponse } from 'src/core/common/api-entity-response';
import { ErrorResponse } from 'src/core/common/api-exception-error';
import { TypeError } from 'src/core/common/api-error.enum';
import {
	BadRequestException,
	CallHandler,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Observable, map, catchError, of } from 'rxjs';
import { QueryFailedError } from 'typeorm';

interface ClassValidatorError {
	statusCode: number;
	message: string[];
	error: string;
}

// interface Response

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
	intercept<T>(
		_: ExecutionContext,
		next: CallHandler
	): Observable<EntityResponse<T> | ErrorResponse> {
		return next.handle().pipe(
			map((response: EntityResponse<T>) => ({
				...response,
			})),
			catchError((error) => {
				if (error instanceof QueryFailedError) {
					throw new HttpException(
						{
							statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
							error: true,
							message: 'error de DB',
							result: null,
						},
						HttpStatus.INTERNAL_SERVER_ERROR
					);
				}

				if (error instanceof BadRequestException) {
					const { statusCode, message } = error.getResponse() as ClassValidatorError;
					throw new HttpException(
						{
							statusCode,
							typeError: TypeError['Warning'],
							error: true,
							message,
							result: null,
						},
						HttpStatus.BAD_REQUEST
					);
				}

				if (error instanceof HttpException) {
					const errorC = error.getResponse() as ErrorResponse;
					throw new HttpException({ ...errorC }, errorC.statusCode);
				}

				console.log({ error });
				return of(error);
			})
		);
	}
}
