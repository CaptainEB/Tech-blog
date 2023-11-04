import { Router } from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';
const router = Router();
// home route
router.get('/', async (req, res) => {
	const postsRaw = await Post.findAll({ order: [['created_at', 'DESC']] });
	const posts = await Promise.all(
		postsRaw.map(async (post) => {
			post = post.get({ plain: true });
			post.created_at = new Date(post.created_at).toLocaleDateString();
			const user = await User.findByPk(post.user_id);
			post.user_id = user.get({ plain: true }).username;
			return post;
		})
	);
	// post --> { id, title, content, user_id, created_at}
	res.render('home', { posts, loggedIn: req.session.loggedIn });
});

export default router;
