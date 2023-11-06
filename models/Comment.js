import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection.js';

class Comment extends Model {}

export default Comment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		comment: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
		post_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'post',
				key: 'id',
				onDelete: 'CASCADE',
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'comment',
	}
);
