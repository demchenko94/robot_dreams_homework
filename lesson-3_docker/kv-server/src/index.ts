import config from './config.js';
import express from 'express';
import keyRoutes from './key/key.routes.js';

const app = express();

app.use(express.json());
app.use('', keyRoutes);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
