import { User } from '../interfaces/user.interface';

export type UserCreatePayload = Omit<User, 'id' | 'createdAt'>;
export type UserUpdatePayload = { id: number } & Partial<User>;
