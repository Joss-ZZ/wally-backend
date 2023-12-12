import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { ApiEntityResponse, ApiResponse } from '../../core/common/api-entity-response';
import { ApiEndpoint, getPathController } from '../../config/endpoints';
import { ResponseAuthDto } from './dto/response-auth.dto';

@ApiTags(ApiEndpoint.AUTH)
@Controller(getPathController(ApiEndpoint.AUTH))
export class AuthController {
	constructor(private readonly _authService: AuthService) {}

	@Post('login')
	async loginUser(@Body() loginAuthDto: LoginAuthDto): ApiResponse<ResponseAuthDto> {
		return await ApiEntityResponse.response(
			'Session logged in successfully',
			this._authService.login(loginAuthDto)
		);
	}
}
