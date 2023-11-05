const router = require('express').Router();
const { Users, BlogPosts, Comments } = require('../models');

router.get('/', async (req, res) => {
  try {
    const dbBlogData = await BlogPosts.findAll({
      include: [
        {
          model: Users,
          attributes: ['user_name'],
        },
      ],
    });

    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
      );
      
      console.log(blogs)

      res.render('homepage', {
        blogs,
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

router.get('/:title', async (req,res) => {
  try {
    const dbBlogData = await BlogPosts.findOne({
      where: {
        title: req.params.title
      },
      include: [
        {
          model: Users,
          attributes: ['user_name'],
        },
        {
          model: Comments,
          attributes: ['user_name', 'comment', "comment_date"],
        }
      ],
    });

    const blog = dbBlogData.get({ plain: true })
    console.log(blog);
      res.render('account', {
        blog,
      });
    } catch (err) {
    console.log('Error Here --------->', err);
    res.status(500).json(err);
  }
})

router.get('/:title/comment', async (req,res) => {
  try {
    const dbBlogData = await BlogPosts.findOne({
      where: {
        title: req.params.title
      },
      include: [
        {
          model: Users,
          attributes: ['user_name'],
        },
      ],
    });

    const blog = dbBlogData.get({ plain: true })
      res.render('comment', {
        blog,
      });
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})


module.exports = router;
