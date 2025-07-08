import 'reflect-metadata';
import { METADATA_KEYS } from '../metadata.keys';

export function Controller(prefix = ''): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata(METADATA_KEYS.CONTROLLER, prefix, target);
    };
}
