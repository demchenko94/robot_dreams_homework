import { Habit } from '../interfaces/habit.interface';

const habitKeyOrder: (keyof Habit)[] = ['id', 'name', 'frequency', 'createDate', 'doneDates'];


/**
 * Sorts the keys of a Habit object in a predefined order.
 * @param habit - The Habit object to sort.
 * @returns A new Habit object with keys sorted in the specified order.
 */
export const sortHabitKeys = (habit: Habit): Habit => {
  const sorted = {} as Record<keyof Habit, Habit[keyof Habit]>;

  for (const key of habitKeyOrder) {
    sorted[key] = habit[key];
  }

  return sorted as Habit;
};
