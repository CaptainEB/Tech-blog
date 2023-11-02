import { Router } from 'express';
import User from '../models/User.js';
import auth from '../utils/authenticated.js';
const router = Router();

// /user routes
router.get('/login', (req, res) => {
	res.render('login');
});

router.post('/login', async (req, res) => {
	try {
		const body = req.body; // this should be {username: '...', password: '...' }
		const user = await User.findOne({ where: { username: body.username } });
		if (!user) return res.status(400).json({ message: 'No user with that username!' });
		if (!user.checkPassword(body.password)) return res.status(400).json({ message: 'Incorrect password!' });
		req.session.save(() => {
			req.session.loggedIn = true;
			req.session.id = user.id;
			res.status(200).json(user);
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/signup', (req, res) => {
	res.render('signup');
});

router.post('/signup', async (req, res) => {
	try {
		const body = req.body; // this should be {name: '...', username: '...', password: '...' }
		const user = await User.create(body);
		req.session.save(() => {
			req.session.loggedIn = true;
			req.session.id = user.id;
			res.status(200).json(user);
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

export default router;
