export class BrewsController {
    static scope = 'scoped';

    constructor(brewsService) {
        console.log(`UsersController initialized`);
        this.brewsService = brewsService;
    }

    index = (_req, res) =>
        res.json(this.brewsService.getAll(_req.query));

    show = (req, res) =>
        res.json(this.brewsService.getOne(req.params.id));

    create = (req, res) =>
        res.status(201).json(this.brewsService.create(req.body));

    update = (req, res) =>
        res.json(this.brewsService.update(req.params.id, req.body));

    remove = (req, res) => {
        this.brewsService.delete(req.params.id);
        res.status(204).end();
    };
}
