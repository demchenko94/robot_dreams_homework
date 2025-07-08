import 'reflect-metadata';
import {getInjectTokens} from './decorators';

export class Container {
    #registered = new Map();
    #singletons = new Map();
    #parent?: Container;

    constructor(parent?: Container) {
        this.#parent = parent;
    }

    resolve<T>(token: new (...args: any[]) => T): T {
        if (this.#singletons.has(token)) return this.#singletons.get(token);
        const classItem = this.#registered.get(token);
        if (!classItem) {
            if (this.#parent) {
                return this.#parent.resolve(token);
            }
            throw new Error(`Token ${token.name} is not registered.`);
        }

        const deps: any[] = Reflect.getMetadata("design:paramtypes", token) || [];
        const injectTokens = getInjectTokens(token);

        const resolved = new classItem(...deps.map((dependency, index) => {
            const actualToken = injectTokens[index] || dependency;
            if (actualToken === token) {
                throw new Error(`Circular dependency detected for token ${token.name}.`);
            }

            return this.resolve(actualToken)
        }));

        this.#singletons.set(token, resolved);
        return resolved;
    }

    register<T extends Function>(token: T, member: T): void {
        if (this.#registered.has(token)) {
            throw new Error(`Token ${token.name} is already registered.`);
        }

        this.#registered.set(token, member);
    }
}

export const container = new Container();
