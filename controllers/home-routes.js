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

    const accountName = req.session.loggedIn;

    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
      );
      
      console.log(blogs)

      res.render('homepage', {
        blogs,
        accountName,
      });
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

const loginPage = true;
router.get('/login', async (req,res) => {
  res.render('login', {
    loginPage
  })
})
const signupPage = true;
router.get('/signup', async (req, res) => {
  res.render('signup',{
    signupPage,
  })
})

router.get('/dashboard', async (req,res) => {
  try{
    const userdb = await Users.findOne({
      where: {
        user_name: req.session.loggedIn
      },
      include: {
        model: BlogPosts,
        attributes: ['title', 'blog_date', 'id']
      } 
    });
    const userBlogs = userdb.get({ plain: true })
    const accountName = req.session.loggedIn;
    res.render('dashboard',{
      userBlogs,
      accountName,
    })
  } catch (err) {
    res.status(500).json(err)
  }

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
    if (dbBlogData) {
      const accountName = req.session.loggedIn;
      const blog = dbBlogData.get({ plain: true });
      if (accountName) {
        res.render('account', {
          blog,
          accountName,
        });
      } else {
        res.render('login');
      }
    } else {
      // Handle the case where no record was found with the specified title
      res.status(404).send('Blog post not found');
    }
  } catch (err) {
    console.log('Error Here --------->', err);
    res.status(500).json(err);
  }
});

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

    const accountName = req.session.loggedIn;

    const blog = dbBlogData.get({ plain: true });

    const commentsLoaded = true;

      res.render('comment', {
        blog,
        commentsLoaded,
        accountName
      });
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/create/new/blogpost', async (req,res) => {
  try{
    const newBlog = true;
    res.render('create',{
      newBlog,
    });
  } catch(err){
    res.status(500).json(err)
  }
    
})

router.get('/update/your/post/:id', async (req,res) => {
  try{
    const findPost = await BlogPosts.findOne({
      where: {
        id: req.params.id,
      },
    });
    const updatePost = findPost.get({ plain: true });
    const accountName = req.session.loggedIn;
    const updatePage = true;
    res.render('updateBlog', {
      updatePost,
      updatePage,
      accountName
    });

  }catch(err){
    res.status(500).json(err);
  }
})

router.get('/are/you/sure/you/want/to/do/this/:id', async (req,res) => {
  try {
    const findPost = await BlogPosts.findOne({
      where: {
        id: req.params.id
      }
    });
    const deletePost = findPost.get({ plain: true });
    const accountName = req.session.loggedIn;
    const deleteActive = true;
    res.render('delete', {
      deletePost,
      deleteActive,
      accountName
    })
  }catch(err){
    res.status(500).json(err);
  }
})



module.exports = router;
