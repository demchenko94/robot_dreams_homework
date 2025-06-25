import { KeyService } from './key.service.js';
import { Request, Response } from 'express';

export class KeyController {
  private readonly keyService;

  constructor(keyService: KeyService) {
    this.keyService = keyService;
  }

  public getValue(request: Request, response: Response): void {
    const key = request.query.key ?? null;

    if (typeof key !== 'string') {
      response.status(400).json({ error: `Query param ${key} is required` });
    }

    const value = this.keyService.get(key as string);

    response.json(value);
  }

  public setValue(request: Request, response: Response): void {
    const payload = request.body;

    const result = this.keyService.set(payload);
    response.json(result);
  }
}
