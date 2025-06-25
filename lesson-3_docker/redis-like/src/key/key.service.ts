import { KeyModel } from './key.model.js';

export class KeyService {
  private readonly model: KeyModel;

  constructor(model: KeyModel) {
    this.model = model;
  }

  public get(key: string): { value: string | null } {
    return {
      value: this.model.get(key) || null,
    };
  }

  public set({ key, value }: { key: string; value: string }): { ok: boolean } {
    this.model.set(key, value);
    return { ok: true };
  }
}
