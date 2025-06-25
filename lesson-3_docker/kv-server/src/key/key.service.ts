import config from '../config.js';

export class KeyService {
  private REDIS_URL = config.REDIS_URL;

  constructor() {}

  public async getFromRedis(key: string): Promise<{ value: string | null }> {
    const res = await fetch(`${this.REDIS_URL}/get?key=${key}`);
    const json = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to fetch key ${key}`);
    }

    return json as { value: string | null };
  }

  public async setToRedis(payload: { key: string; value: string }): Promise<{ ok: boolean }> {
    const res = await fetch(`${this.REDIS_URL}/set`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to set key ${payload.key}`);
    }

    return json as { ok: boolean };
  }
}
