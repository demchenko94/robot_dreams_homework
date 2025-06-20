import { join } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';

import config from '../config';
import { User } from '../interfaces/user.interface';
import { UserCreatePayload, UserUpdatePayload } from '../types/user.type';
import { sortKeys } from '../utils/sort-keys';

export class UsersModel {
  private readonly filePath!: string;

  constructor() {
    this.filePath = join(__dirname, '../..', config.DATABASE_PATH);
  }

  private async read(): Promise<User[]> {
    return JSON.parse(await readFile(this.filePath, 'utf8'));
  }

  private async save(data: User[]): Promise<void> {
    await writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  public async getAll(): Promise<User[]> {
    return await this.read();
  }

  public async getById(id: number): Promise<User> {
    const users: User[] = await this.read();
    const user = users.find((h) => h.id === id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  public async create(payload: UserCreatePayload): Promise<User> {
    let users = await this.read();

    if (!users) {
      users = [];
    }

    const user = {
      id: Number(users.length + 1),
      createdAt: new Date(),
      ...payload,
    };

    users.push(sortKeys(user));
    await this.save(users);

    return user;
  }

  public async update(payload: UserUpdatePayload): Promise<User> {
    const users = await this.read();
    const index = users.findIndex((h) => h.id === payload.id);

    if (index === -1) {
      throw new Error(`User with id ${payload.id} not found`);
    }

    users[index] = sortKeys({ ...users[index], ...payload });
    await this.save(users);

    return users[index];
  }

  public async delete(id: number): Promise<boolean> {
    const users = await this.read();
    const index = users.findIndex((h) => h.id === id);

    if (index === -1) {
      throw new Error(`User with id ${id} not found`);
    }

    users.splice(index, 1);
    await this.save(users);
    return true;
  }
}
