import sequelize from '../config/connection.js';
import { Model, DataTypes } from sequelize;

class Comment extends Model {}

export default Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        Comment: {
            type: DataTypes.STRING,
            allowNull: false,
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
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);