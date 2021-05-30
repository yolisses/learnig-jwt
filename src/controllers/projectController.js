import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.send({ ok: true });
});

export default (app) => app.use('/projects', router);
