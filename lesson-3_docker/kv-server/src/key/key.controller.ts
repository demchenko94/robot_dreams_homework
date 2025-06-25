import { KeyService } from './key.service.js';
import { Request, Response } from 'express';

export class KeyController {
  private readonly keyService;

  constructor(keyService: KeyService) {
    this.keyService = keyService;
  }

  public async getValue(request: Request, response: Response): Promise<void> {
    const key = request.params.key ?? null;
    const value = await this.keyService.getFromRedis(key as string);
    response.json(value);
  }

  public async setValue(request: Request, response: Response): Promise<void> {
    const payload = request.body;

    const result = await this.keyService.setToRedis(payload);
    response.json(result);
  }
}
