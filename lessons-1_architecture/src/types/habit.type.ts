import { Habit } from '../interfaces/habit.interface';

export type HabitCreatePayload = Omit<Habit, 'id' | 'createDate' | 'doneDates'>;
export type HabitUpdatePayload = { id: number } & Partial<Habit>;
