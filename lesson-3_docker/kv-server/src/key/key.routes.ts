import express from 'express';
import { KeyController } from './key.controller.js';
import { KeyService } from './key.service.js';

const router = express.Router();
const keyService = new KeyService();
const keyController = new KeyController(keyService);

router.get('/kv/:key', (request, response) => {
  keyController.getValue(request, response);
});

router.post('/kv', (request, response) => {
  keyController.setValue(request, response);
});


export default router;
