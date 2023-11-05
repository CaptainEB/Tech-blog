import { Router } from 'express';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import User from '../models/User.js';
const router = Router();

// /post routes
router.get('/:postId', async (req, res) => {
	try {
		const postId = req.params.postId;
		const postRaw = await Post.findByPk(postId);
		const post = postRaw.get({ plain: true });
		post.created_at = post.created_at.toLocaleDateString();
		const commentsRaw = await Comment.findAll({ where: { post_id: postId } });
		const comments = await Promise.all(
			commentsRaw.map(async (comment) => {
				comment = comment.get({ plain: true });
				comment.created_at = comment.created_at.toLocaleDateString();
				const user = await User.findByPk(comment.user_id);
				comment.user_id = user.get({ plain: true }).username;
				return comment;
			})
		);
		const authorRaw = await User.findByPk(post.user_id);
		const author = authorRaw.get({ plain: true });
		res.render('post', { post, comments, author, loggedIn: req.session.loggedIn });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// /post/comment route
router.post('/comment', async (req, res) => {
	try {
		const { comment, post_id } = req.body;
		const user_id = req.session.userId;
		if (!comment || !post_id) return res.status(400).json({ message: 'Missing comment or post_id' });
		const newCommentRaw = await Comment.create({ comment, post_id, user_id });
		const newComment = newCommentRaw.get({ plain: true });
		res.status(200).json(newComment);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

export default router;
