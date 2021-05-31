import express from 'express';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
	res.send({ ok: true });
});

export default (app) => app.use('/projects', router);
