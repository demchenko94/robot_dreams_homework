import { IncomingMessage, ServerResponse } from 'node:http';
import { UsersService } from '../../services/users.service';
import { UsersModel } from '../../models/users.model';
import { bodyJSON } from '../../utils/body-json';
import { User } from '../../interfaces/user.interface';
import { json } from '../../utils/json';

const usersModel = new UsersModel();
const usersService = new UsersService(usersModel);

export const GET = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await usersService.getList();
    json(res, 200, users);
  } catch {
    json(res, 500, { error: 'Failed to fetch users' });
  }
};

export const POST = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await bodyJSON<User>(req);
    const user = await usersService.create(body);
    json(res, 201, user);
  } catch {
    json(res, 400, { error: 'Invalid user data' });
  }
};
