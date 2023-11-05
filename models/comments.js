const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const BlogPosts = require('./BlogPosts');

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            notNull: true,
            primaryKey: true,
            autoIncrement: true,
        },
        blog_id: {
            type: DataTypes.INTEGER,
            notNull: true,
            references: {
                model: BlogPosts,
                key: 'id',
            }
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            notNull: true,
        },
        comment_date: {
            type: DataTypes.DATE,
            notNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Comments',
    }
);

module.exports = Comment;