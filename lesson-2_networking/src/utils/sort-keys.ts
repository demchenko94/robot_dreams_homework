import { User } from '../interfaces/user.interface';

const KeyOrder: (keyof User)[] = ['id', 'name', 'createdAt',];


/**
 * Sorts the keys of a User object in a predefined order.
 * @param user - The User object to sort.
 * @returns A new User object with keys sorted in the specified order.
 */
export const sortKeys = (user: User): User => {
  const sorted = {} as Record<keyof User, User[keyof User]>;

  for (const key of KeyOrder) {
    sorted[key] = user[key];
  }

  return sorted as User;
};
