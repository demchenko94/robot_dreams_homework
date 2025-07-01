import {createContainer, asClass} from 'awilix';
import {BrewsController} from './controllers/brews.controller.js';
import {objectMap} from './utils/Object.map.js';
import {BrewsService} from './services/brews.service.js';

const brewsModule = {
    brewsService: BrewsService,
    brewsController: BrewsController
}

export const container = createContainer({injectionMode: 'CLASSIC'})
    .register(
        objectMap(brewsModule, value => asClass(value)[value.scope]())
    );
