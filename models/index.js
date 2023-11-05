const Users = require('./users');
const BlogPosts = require('./BlogPosts');

BlogPosts.belongsTo(Users, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Users.hasMany(BlogPosts, {
  foreignKey: 'user_id',
})



module.exports = { Users, BlogPosts };
