export class KeyModel {
  private store = new Map();

  public get(key: string): string {
    return this.store.get(key);
  }

  public set(key: string, value: string): void {
    this.store.set(key, value);
  }
}
