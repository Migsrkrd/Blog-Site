const { BlogPosts } = require('../models');

const blogPostData = [
  {
    title: 'Testing',
    content: 'This is a test blog!!!',
    user_id: 1,
    blog_date: new Date( 'November 3, 2023'),
  },
  {
    title: 'Another Test',
    content: 'This is another test blog!!!!!!!!!!!!!!!!!!!!!',
    user_id: 2,
    blog_date: new Date('November 4, 2023')
  },
  {
    title: 'Whatsup!',
    content: 'I dont know what else to say so heres another example!',
    user_id: 1,
    blog_date: new Date( 'November 4, 2023'),
  },
];

const seedBlogPosts = () => BlogPosts.bulkCreate(blogPostData);

module.exports = seedBlogPosts;
