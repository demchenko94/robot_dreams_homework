import { Habit } from '../interfaces/habit.interface';

export type HabitStats = Pick<Habit, 'id' | 'name'> & { completionRate: string };
