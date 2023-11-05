const router = require('express').Router();
const { Users, BlogPosts } = require('../models');

router.get('/', async (req, res) => {
  try {
    const dbUserData = await Users.findAll({
      include: [
        {
          model: BlogPosts,
          attributes: ['content', 'blog_date'],
        },
      ],
    });

    const users = dbUserData.map((user) =>
      user.get({ plain: true })
      );
      
      console.log(users)

      res.render('homepage', {
        users,
      });
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', async (req,res) => {
  res.render('login')
})

router.get('/signup', async (req, res) => {
  res.render('signup')
})

router.get('/dashboard', async (req,res) => {
  res.render('dashboard')
})

// router.get('/dashboard', async (req, res) => {
//   try{
//     const dbUserData = await Users.findOne({
//       where: {
//         email: 
//       }
//     },{
//       include: [
//         {
//           model: BlogPosts,
//           attributes: ['content', 'blog_date'],
//         },
//       ],
//     });

//     const users = dbUserData.map((user) =>
//       user.get({ plain: true })
//       );
      
//       console.log(users)

//       res.render('homepage', {
//         users,
//       });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// })

module.exports = router;
