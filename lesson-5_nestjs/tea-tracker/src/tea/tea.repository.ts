import { Injectable } from '@nestjs/common';
import { Tea } from './tea.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TeaRepository {
  private teas: Tea[] = [];

  create(tea: Omit<Tea, 'id'>): Promise<Tea> {
    const newTea: Tea = {
      id: uuidv4(),
      ...tea,
    };
    this.teas.push(newTea);
    return Promise.resolve(newTea);
  }

  findAll(): Promise<Tea[]> {
    return Promise.resolve(this.teas);
  }

  findById(id: string): Promise<Tea | undefined> {
    const tea = this.teas.find((tea) => tea.id === id);
    return Promise.resolve(tea);
  }

  update(
    id: string,
    update: Partial<Omit<Tea, 'id'>>,
  ): Promise<Tea | undefined> {
    const tea = this.teas.find((t) => t.id === id);
    if (!tea) return Promise.resolve(undefined);

    Object.assign(tea, update);
    return Promise.resolve(tea);
  }

  delete(id: string): Promise<boolean> {
    const index = this.teas.findIndex((t) => t.id === id);
    if (index === -1) return Promise.resolve(false);

    this.teas.splice(index, 1);
    return Promise.resolve(true);
  }
}
