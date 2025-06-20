import { IncomingMessage, ServerResponse } from 'node:http';
import { UsersService } from '../../../services/users.service';
import { UsersModel } from '../../../models/users.model';
import { json } from '../../../utils/json';
import { bodyJSON } from '../../../utils/body-json';
import { UserUpdatePayload } from '../../../types/user.type';

const usersModel = new UsersModel();
const usersService = new UsersService(usersModel);

export const GET = async (req: IncomingMessage, res: ServerResponse, params: { id: number }) => {
  try {
    const userId = Number(params['id']);
    const user = await usersService.getById(userId);

    json(res, 200, user);
  } catch {
    json(res, 404, { error: 'User not found' });
  }
};

export const PUT = async (req: IncomingMessage, res: ServerResponse, params: { id: number }) => {
  try {
    const userId = Number(params['id']);
    const body = await bodyJSON<UserUpdatePayload>(req);
    const payload = { ...body, id: userId };
    const user = await usersService.update(payload);

    json(res, 200, user);
  } catch {
    json(res, 400, { error: 'Invalid user data' });
  }
};

export const DELETE = async (req: IncomingMessage, res: ServerResponse, params: { id: number }) => {
  try {
    const userId = Number(params['id']);
    await usersService.deleted(userId);

    json(res, 200);
  } catch {
    json(res, 404, { error: 'User not found' });
  }
};
