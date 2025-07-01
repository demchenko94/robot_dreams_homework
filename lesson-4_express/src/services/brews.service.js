import {nanoid} from "nanoid";

export class BrewsService {
    static scope = 'singleton';
    #store  = new Map();

    constructor() {
        console.log(`BrewsService initialized`);
    }

    getAll(query) {
        const {method, ratingMin} = query;
        const entries = Array.from(this.#store.values()).filter((item) => {
            return (item.method === method && item.rating >= ratingMin) || (item.method === method) || (item.rating >= ratingMin);
        });

        return entries;
    }

    getOne(id) {
        const brew = this.#store.get(id);
        if (!brew) throw Object.assign(new Error('Brew not found'), {status: 404});
        return brew;
    }

    create(dto) {
        const id = nanoid(8);
        const brew = {...dto, id};
        this.#store.set(id, brew);
        return brew;
    }

    update(id, dto) {
        const brew = this.#store.get(id);
        if (!brew) throw Object.assign(new Error('Brew not found'), {status: 404});
        const updatedBrew = {...brew, ...dto};
        this.#store.set(id, updatedBrew);
        return updatedBrew;
    }

    delete(id) {
        const result = this.#store.delete(id);
        if (!result) throw Object.assign(new Error('User not found'), {status: 404});
    }
}
