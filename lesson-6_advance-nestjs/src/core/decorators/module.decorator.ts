import {METADATA_KEYS} from "../metadata.keys";
import {ModuleOptions} from "../interfaces";

export function Module(options: ModuleOptions): ClassDecorator {
    return function (target: any) {
        Reflect.defineMetadata(METADATA_KEYS.MODULE, options, target);
    };
}
