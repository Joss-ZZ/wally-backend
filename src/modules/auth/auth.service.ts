import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { decrypted } from '../../utils/encryption';
import { Payload } from './strategies/jwt.strategy';
import { ResponseAuthDto } from './dto/response-auth.dto';
import { plainToInstance } from 'class-transformer';
import { ApiException } from '../../core/common/api-exception-error';
import { EnumApiError } from '../../core/common/api-error.enum';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly _jwtService: JwtService,
		@InjectRepository(User)
		private readonly _repository: Repository<User>
	) {}

	async login(loginAuthDto: LoginAuthDto): Promise<ResponseAuthDto> {
		const { username, password } = loginAuthDto;

		const existsUser = await this._repository.exist({
			where: {
				username,
			},
		});

		ApiException.expect(existsUser).toBeFalsy(EnumApiError.U001);

		const userFound = await this._repository.findOne({
			where: {
				username,
			},
		});

		ApiException.expect(await decrypted(password, userFound.password)).toBeFalsy(EnumApiError.U001);

		const { userId } = userFound;

		const payload: Payload = {
			userId,
		};

		const token = this._jwtService.sign(payload);

		return {
			user: plainToInstance(ResponseUserDto, userFound),
			token,
		};
	}
}
