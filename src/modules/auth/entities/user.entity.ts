import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn({ name: 'id' })
	userId: number;

	@Column({ name: 'username', type: 'varchar', length: 20 })
	username: string;

	@Column({ name: 'password', type: 'varchar', length: 200 })
	password: string;
}
