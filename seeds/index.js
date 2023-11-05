const sequelize = require('../config/connection');
const seedBlogPosts = require('./BlogPostsData');
const seedUsers = require('./userData')
const seedComments = require('./commentsData')

const seedAll = async () => {
  try{
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedBlogPosts();

  await seedComments();
  } catch (err) {
    console.error('Error trying to Seed:', err)
    return;
  }

  process.exit(0);
};

seedAll();
