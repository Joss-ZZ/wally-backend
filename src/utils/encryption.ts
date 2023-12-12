import { compare, genSalt, hash } from 'bcryptjs';

export async function encryption(password: string): Promise<string> {
	const salt = await genSalt();
	return hash(password, salt);
}

export function decrypted(password: string, hash: string): Promise<boolean> {
	return compare(password, hash);
}
