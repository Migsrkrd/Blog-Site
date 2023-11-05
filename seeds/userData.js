const { Users } = require('../models');

const userdata = [
  {
    user_name: 'migsrkrd',
    email: 'migsrkrd@gmail.com',
    password: 'Sharks211',
  },
  {
    user_name: 'testingusername',
    email: 'email@gmail.com',
    password: 'squeeeeeeps',
  },
];

const seedUsers = () => Users.bulkCreate(userdata);

module.exports = seedUsers;
