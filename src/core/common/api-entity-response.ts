import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class EntityResponse<T> {
	@ApiProperty()
	statusCode: HttpStatus;
	@ApiProperty()
	message: string;
	@ApiProperty()
	error: boolean;
	@ApiProperty()
	result: Awaited<T> | null;
}

export type ApiResponse<T> = Promise<EntityResponse<T>>;

export class ApiEntityResponse {
	private constructor() {}

	static async response<T>(message: string, result: Promise<T>): ApiResponse<T> {
		return {
			statusCode: HttpStatus.OK,
			message,
			error: false,
			result: await result,
		};
	}
}
