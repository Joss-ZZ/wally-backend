import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { ResponseAuthDto } from '../dto/response-auth.dto';

describe('AuthController', () => {
	let controller: AuthController;
	let authService: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: {
						login: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		authService = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('loginUser', () => {
		it('should return an ApiResponse<ResponseAuthDto> when logging in', async () => {
			const loginAuthDto: LoginAuthDto = {
				username: 'test',
				password: '123456',
			};

			const mockedResponse: ResponseAuthDto = {
				user: {
					userId: 1,
					username: 'test',
					password: '$2a$10$QCsXQvOBV0VTZnvJYD7.Cu06OdsQlQUem3ti3d6d6Ha3UKuQpRKvO',
				},
				token:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjM4Mzc2NCwiZXhwIjoxNzAyMzg3MzY0fQ.wEq6XCt_tVjP38fwnx09lpxE06TDDUxeoXUSSDr-pu0',
			};

			authService.login = jest.fn().mockResolvedValue(mockedResponse);

			const result = await controller.loginUser(loginAuthDto);

			expect(result).toBeDefined();
			expect(result.message).toBe('Session logged in successfully');
			expect(authService.login).toHaveBeenCalledWith(loginAuthDto);
		});
	});
});
