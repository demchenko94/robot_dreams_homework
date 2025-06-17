import { HabitService } from '../habit/service';
import { HabitModel } from '../habit/model';
import { HabitController } from '../habit/controller';
import { getArg, getCommand } from '../utils/cli-args';
import { frequencyType } from '../types/frequency.type';

const habitModel = new HabitModel();
const habitService = new HabitService(habitModel);
const habitController = new HabitController(habitService);

const command = getCommand();

/**
 * Run the CLI command based on the provided arguments.
 * This function handles different commands like add, list, done, stats, delete, and update.
 * It retrieves the necessary arguments and calls the appropriate methods from the HabitController.
 */
export async function runCLI() {
  try {
    switch (command) {
      case 'add': {
        const payload = {
          name: getArg('--name'),
          frequency: getArg('--freq') as frequencyType,
        };
        await habitController.add(payload);
        break;
      }
      case 'list': {
        await habitController.list();
        break;
      }
      case 'done': {
        const id = Number(getArg('--id'));
        await habitController.done(id);
        break;
      }
      case 'stats': {
        await habitController.stats();
        break;
      }
      case 'delete': {
        const id = Number(getArg('--id'));
        await habitController.delete(id);
        break;
      }
      case 'update': {
        const payload = {
          id: Number(getArg('--id')),
          name: getArg('--name'),
          frequency: getArg('--freq') as frequencyType | undefined,
        };

        await habitController.update(payload);
        break;
      }
      default:
        console.log('❓ Unknown command. Try: add, list, done, stats, delete, update.');
    }
  } catch (error) {
    console.log(error);
    console.error('Error:', (error as Error).message);
  }
}
