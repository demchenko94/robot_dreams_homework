import { frequencyType } from '../types/frequency.type';

export interface Habit {
  id: number;
  name: string;
  frequency: frequencyType;
  createDate: Date;
  doneDates: string[];
}
