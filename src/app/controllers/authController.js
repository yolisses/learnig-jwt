import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth.js';

const router = express.Router();

function generateToken(params = {}) {
	return jwt.sign(params, authConfig.secret, {
		expiresIn: 86400, //one day
	});
}

router.post('/register', async (req, res) => {
	const { email } = req.body;
	if (await User.findOne({ email })) {
		return res.status(400).send({ error: 'User already exists' });
	}
	try {
		const user = await User.create(req.body);
		user.password = undefined;

		res.send({
			user,
			token: generateToken({ id: user.id }),
		});
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

	res.send({
		user,
		token: generateToken({ id: user.id }),
	});
});

export default (app) => app.use('/auth', router);
