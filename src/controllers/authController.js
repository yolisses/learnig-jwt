import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
	const { email } = req.body;
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

router.post('/authenticate', async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email }).select('+password');

	if (!user) return res.status(400).send({ error: 'User not found' });

	if (!(await bcrypt.compare(password, user.password)))
		return res.status(400).send({ error: 'Invalid password' });

	user.password = undefined;

	const token = jwt.sign({ id: user.id }, authConfig.secret, {
		expiresIn: 86400, //one day
	});

	res.send({ user, token });
});

export default (app) => app.use('/auth', router);
