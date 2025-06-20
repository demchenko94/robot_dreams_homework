import { UsersModel } from '../models/users.model';
import { User } from '../interfaces/user.interface';
import { UserCreatePayload, UserUpdatePayload } from '../types/user.type';

export class UsersService {
  private readonly model: UsersModel;

  constructor(model: UsersModel) {
    this.model = model;
  }

  public async getList(): Promise<User[]> {
    return await this.model.getAll();
  }

  public async create(payload: UserCreatePayload): Promise<User> {
    if (Object.keys(payload).length === 0) {
      throw new Error('Invalid user data');
    }
    return await this.model.create(payload);
  }

  public async getById(id: number): Promise<User> {
    return await this.model.getById(id);
  }

  public async update(payload: UserUpdatePayload): Promise<User> {
    if (Object.keys(payload).length === 0) {
      throw new Error('Invalid user data');
    }
    return await this.model.update(payload);
  }

  public async deleted(id: number): Promise<boolean> {
    return await this.model.delete(id);
  }
}
