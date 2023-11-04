import { Router } from 'express';
import User from '../models/User.js';
import auth from '../utils/authenticated.js';
const router = Router();

// / home routes related to user
router.get('/login', (req, res) => {
	res.render('login', { loggedIn: req.session.loggedIn });
});

router.post('/login', async (req, res) => {
	try {
		const body = req.body; // this should be {username: '...', password: '...' }
		const userData = await User.findOne({ where: { username: body.username } });
		if (!userData) return res.status(400).json({ message: 'No user with that username!' });
		if (!userData.checkPassword(body.password)) return res.status(400).json({ message: 'Incorrect password!' });
		const user = userData.get({ plain: true });
		req.session.save(() => {
			req.session.loggedIn = true;
			req.session.userId = user.id;
			res.status(200).json(user);
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/signup', (req, res) => {
	res.render('signup', { loggedIn: req.session.loggedIn });
});

router.post('/signup', async (req, res) => {
	try {
		const body = req.body; // this should be {name: '...', username: '...', password: '...' }
		const userData = await User.create(body);
		const user = userData.get({ plain: true });
		req.session.save(() => {
			req.session.loggedIn = true;
			req.session.userId = user.id;
			res.status(200).json(user);
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/logout', auth, async (req, res) => {
	try {
		req.session.destroy(() => {
			res.status(200).json({ message: 'Logged out!' });
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

export default router;
