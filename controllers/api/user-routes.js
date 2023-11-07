const router = require('express').Router();
const { User, Users, BlogPosts } = require('../../models');
const Comment = require('../../models/comments');
const { findAll } = require('../../models/users');
const bcrypt = require('bcrypt')

// create new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await Users.create({
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = dbUserData.user_name;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//call for log in functionality
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
//if there isnt a user with that email, render error
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
        alert('Incorrect email or password. Please try again!')
      return;
    }

//check if the password that was entered matchs in the db
    const validPassword = await dbUserData.checkPassword(req.body.password);
//if it doesnt match, render error
    if(!validPassword) {
      res
      .status(400)
      .json({ message: 'Incorrect email or password. Please try again!' });
      alert('Incorrect email or password. Please try again!')
    return;
    }

    req.session.save(() => {
      req.session.loggedIn = dbUserData.user_name;
      res.status(200).json({ user: dbUserData, message: 'You are now logged in!', loggedIn: req.session.loggedIn });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all users with their associated blog post titles and dates
router.get('/', async (req,res) => {
  try{
    const usersdb = await Users.findAll({
      include: {
        model: BlogPosts,
        attributes: ['title', 'blog_date'],
      },
    });
    res.status(200).json(usersdb)
  } catch (err){
    res.status(500).json(err);
  }
})

// Logout call
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
  req.session.destroy();
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
