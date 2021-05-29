import express from 'express';

const app = express();

app.use(express.json());

import authController from './controllers/authController.js';
authController(app);

const port = 5000;

app.listen(port, () =>
	console.log('Server running at http://localhost:' + port)
);
