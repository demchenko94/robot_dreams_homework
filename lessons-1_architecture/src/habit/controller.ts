import { HabitService } from './service';
import { HabitCreatePayload, HabitUpdatePayload } from '../types/habit.type';

export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  public async add(payload: HabitCreatePayload): Promise<void> {
    await this.habitService.add(payload);

    console.log(`Created ${payload.name} habit successfully.`);
  }

  public async list(): Promise<void> {
    const habits = await this.habitService.getList();

    if (habits.length === 0) {
      console.log('No habits found.');
      return;
    }

    console.table(habits);
  }

  public async done(id: number): Promise<void> {
    await this.habitService.done(id);
    console.log(`Marked habit with id ${id} as done for today.`);
  }

  public async stats(): Promise<void> {
    const stats = await this.habitService.getStats();
    console.table(stats);
  }

  public async delete(id: number): Promise<void> {
    const result = await this.habitService.delete(id);

    if (result) {
      console.log(`Habit with id ${id} has been deleted successfully.`);
      return;
    }
  }

  public async update(payload: HabitUpdatePayload): Promise<void> {
    const updatedHabit = await this.habitService.update(payload);

    console.log(`Habit with id ${updatedHabit.id} has been updated successfully.`);
    console.table(updatedHabit);
  }
}
