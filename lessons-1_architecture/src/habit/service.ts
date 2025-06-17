import { HabitModel } from './model';
import { Habit } from '../interfaces/habit.interface';
import { HabitCreatePayload, HabitUpdatePayload } from '../types/habit.type';
import { calculateTotalDays } from '../utils/calculate-tota-days';
import { calculateRate } from '../utils/calculate-rate';
import { HabitStats } from '../types/habit-stats.type';

export class HabitService {
  private readonly model: HabitModel;

  constructor(model: HabitModel) {
    this.model = model;
  }

  public async add(payload: HabitCreatePayload): Promise<Habit> {
    return await this.model.create(payload);
  }

  public async getList(): Promise<Habit[]> {
    return await this.model.getAll();
  }

  public async done(id: number): Promise<void> {
    const habit: Habit = await this.model.getById(id);
    const today = new Date().toISOString();

    if (!habit.doneDates.includes(today)) {
      habit.doneDates.push(today);
      await this.model.update({ id, doneDates: habit.doneDates });
    } else {
      throw new Error(`Habit with id ${id} is already marked as done for today.`);
    }
  }

  public async getStats(): Promise<HabitStats[]> {
    const habits: Habit[] = await this.model.getAll();
    const stats: HabitStats[] = [];

    for (const habit of habits) {
      const doneCount = habit.doneDates.length;
      const totalDays = calculateTotalDays(habit.createDate);
      const rate = calculateRate(habit.frequency, doneCount, totalDays);

      stats.push({
        id: habit.id,
        name: habit.name,
        completionRate: rate.toFixed(2) + '%',
      });
    }

    return stats;
  }

  public async delete(id: number): Promise<boolean> {
    return await this.model.delete(id);
  }

  public async update(payload: HabitUpdatePayload): Promise<Habit> {
    return await this.model.update(payload);
  }
}
