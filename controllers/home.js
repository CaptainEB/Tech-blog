import { Router } from 'express';
import Posts from '../models/Post.js';
const router = Router();
// home route
router.get('/', async (req, res) => {
	const postsRaw = await Posts.findAll({ order: [['created_at', 'DESC']] });
	const posts = postsRaw.map((post) => {
		post.get({ plain: true });
	});

	// post --> { id, title, content, user_id, created_at}
	res.render('home', { posts });
});

export default router;
