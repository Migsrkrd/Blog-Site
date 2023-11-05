const { Comments } = require('../models');

const commentsdata = [
  {
    blog_id: 1,
    user_name: 'StevioMark',
    comment: "Wasnt a very good blog",
    comment_date: new Date( 'November 4, 2023'),
  },

];

const seedComments = () => Comments.bulkCreate(commentsdata);

module.exports = seedComments;