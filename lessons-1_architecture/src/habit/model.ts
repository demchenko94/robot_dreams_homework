import { join } from 'node:path';
import config from '../config';
import { readFile, writeFile } from 'node:fs/promises';

import { Habit } from '../interfaces/habit.interface';
import { HabitCreatePayload, HabitUpdatePayload } from '../types/habit.type';
import { sortHabitKeys } from '../utils/sort-habit-keys';

export class HabitModel {
  private readonly filePath!: string;

  constructor() {
    this.filePath = join(__dirname, '../..', config.databasePath);
  }

  private async read(): Promise<Habit[]> {
    return JSON.parse(await readFile(this.filePath, 'utf8'));
  }

  private async save(data: Habit[]) {
    await writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  public async getAll(): Promise<Habit[]> {
    return await this.read();
  }

  public async getById(id: number): Promise<Habit> {
    const habits: Habit[] = await this.read();
    const habit = habits.find((h) => h.id === id);

    if (!habit) {
      throw new Error(`Habit with id ${id} not found`);
    }
    return habit;
  }

  public async create(payload: HabitCreatePayload): Promise<Habit> {
    let habits = await this.read();

    if (!habits) {
      habits = [];
    }

    const habit = {
      id: Number(habits.length + 1),
      createDate: new Date(),
      doneDates: [],
      ...payload,
    };

    habits.push(sortHabitKeys(habit));
    await this.save(habits);

    return habit;
  }

  public async update(payload: HabitUpdatePayload): Promise<Habit> {
    const habits = await this.read();
    const index = habits.findIndex((h) => h.id === payload.id);

    if (index === -1) {
      throw new Error(`Habit with id ${payload.id} not found`);
    }

    habits[index] = sortHabitKeys({ ...habits[index], ...payload });
    await this.save(habits);

    return habits[index];
  }

  public async delete(id: number): Promise<boolean> {
    const habits = await this.read();
    const index = habits.findIndex((h) => h.id === id);

    if (index === -1) {
      throw new Error(`Habit with id ${id} not found`);
    }

    habits.splice(index, 1);
    await this.save(habits);
    return true;
  }
}
