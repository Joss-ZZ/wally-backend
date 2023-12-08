enum ApiConfig {
	VERSION = 'v1',
	PATH = 'api',
}

export enum ApiEndpoint {
	AUTH = 'auth',
	EXCHANGE = 'exchange',
	SWAGGER = 'swagger',
}

export function getPathController(endpoint: ApiEndpoint): string {
	return `${ApiConfig.PATH}/${ApiConfig.VERSION}/${endpoint}`;
}
