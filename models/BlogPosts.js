const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection')

const Users = require('./users')

class BlogPosts extends Model { }

BlogPosts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            notNull: true,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            notNull: true,
            unique: true,
        },
        content: {
            type: DataTypes.TEXT,
            notNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            notNull: true,
            references: {
                model: Users,
                key: 'id'
            }
        },
        blog_date: {
            type: DataTypes.DATE,
            notNull: true,
        },
    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'BlogPosts',
    }
);

module.exports = BlogPosts;