import express from 'express';
import { KeyController } from './key.controller.js';
import { KeyService } from './key.service.js';
import { KeyModel } from './key.model.js';

const router = express.Router();
const keyModel = new KeyModel();
const keyService = new KeyService(keyModel);
const keyController = new KeyController(keyService);

router.get('/get', (request, response) => {
  keyController.getValue(request, response);
});

router.post('/set', (request, response) => {
  keyController.setValue(request, response);
});


export default router;
