import Comment from './Comment.js';
import Post from './Post.js';
import User from './User.js';

User.hasMany(Post, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

User.hasMany(Comment, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

Post.hasMany(Comment, {
	foreignKey: 'post_id',
	onDelete: 'CASCADE',
});

Post.belongsTo(User, {
	foreignKey: 'user_id',
});

Comment.belongsTo(User, {
	foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
	foreignKey: 'post_id',
});

export { Comment, Post, User };
