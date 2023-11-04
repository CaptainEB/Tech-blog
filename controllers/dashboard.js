import { Router } from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';
import auth from '../utils/authenticated.js';
const router = Router();
// /dashboard route
router.get('/', auth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.userId);
		const user = userData.get({ plain: true });
		const postData = await Post.findAll({ where: { user_id: req.session.userId } });
		const posts = postData.map((post) => post.get({ plain: true }));
		res.render('dashboard', { user, posts, loggedIn: req.session.loggedIn });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', auth, async (req, res) => {
	try {
		const body = req.body; // should be { title: '...', content: '...' }
		if(!body.title || !body.content) return res.status(400).json({ message: 'Missing title or content' });
		const userData = await User.findByPk(req.session.userId);
		const user = userData.get({ plain: true });
		const postData = await Post.create({ ...body, user_id: user.id });
		const post = postData.get({ plain: true });
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json(err);
	}
});

export default router;
