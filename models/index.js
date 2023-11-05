const Users = require('./users');
const BlogPosts = require('./BlogPosts');
const Comments = require('./comments')

BlogPosts.belongsTo(Users, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Users.hasMany(BlogPosts, {
  foreignKey: 'user_id',
});

BlogPosts.hasMany(Comments, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

Comments.belongsTo(BlogPosts, {
  foreignKey: 'blog_id'
})


module.exports = { Users, BlogPosts, Comments };
