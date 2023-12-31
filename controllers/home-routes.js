const router = require('express').Router();
const { Users, BlogPosts, Comments } = require('../models');

//get all blogpost data for homepage
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

//declaring session recognition
    const accountName = req.session.loggedIn;
    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
      );
      res.render('homepage', {
        blogs,
        accountName,
      });
    } catch (err) {
    res.status(500).json(err);
  }
});

//set a variable to create an if in the handlebars
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

//get the dashboard but only for the logged in user
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
    const addCreate = true;
    res.render('dashboard',{
      userBlogs,
      accountName,
      addCreate,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

//get the specific post that is clicked on on homepage
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
        res.redirect('/login');
      }
    } else {
      res.status(404).send('Blog post not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//load the comment page for its correlating blogpost
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
    res.status(500).json(err);
  }
})

//create home link for creating a new blog post page
router.get('/create/new/blogpost', async (req,res) => {
  try{
    const newBlog = true;
    const accountName = req.session.loggedIn;
    res.render('create',{
      newBlog,
      accountName
    });
  } catch(err){
    res.status(500).json(err)
  }
})

//create home link for updating a blog post
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

//create a home linke for going to the delete warning page
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
