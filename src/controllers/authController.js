import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post('/register', async (req, res) => {
	const email = req.body.email;
	if (await User.findOne({ email })) {
		return res.status(400).send({ error: 'User already exists' });
	}
	try {
		const user = await User.create(req.body);
		user.password = undefined;
		return res.send({ user });
	} catch {
		return res.status(400).send({ error: 'Registration failed' });
	}
});

export default (app) => app.use('/auth', router);
