const router = require('express').Router();
const { BlogPosts, Comments, Users } = require('../../models');
const { findAll } = require('../../models/BlogPosts');


//get blogs data
router.get('/', async (req, res) => {
    try {
        const usersdb = await BlogPosts.findAll({
            include: {
                model: Comments,
                attributes: ['comment', 'comment_date', 'user_name']
            }
        });
        res.status(200).json(usersdb)
    } catch (err) {
        res.status(500).json(err);
    }
})


//add to blogposts data where your username is
router.post('/', async (req, res) => {
    try{
        const currentuser = await Users.findOne({
            where: {
                user_name: req.session.loggedIn
            }
        })
        const newBlogPost = await BlogPosts.create({
            title: req.body.title,
            content: req.body.content,
            user_id: currentuser.id,
            blog_date: req.body.blog_date,
        });
        res.status(200).json(newBlogPost)
    }catch(err){
        res.status(500).json(err)
    }
})

//update a blog posts
router.put('/:id', async (req,res) => {
    try{
        const updatePost = await BlogPosts.update({
            title: req.body.title,
            content: req.body.content,
        },
        {
            where: {
                id: req.params.id
            }
        }
        )
        res.status(200).json(updatePost);
    }catch(err){
        res.status(500).json(err);
    }
})

//delete a blog post
router.delete('/:id', async (req,res)=>{
    try {
        const findPost = await BlogPosts.findOne({
          where: {
            id: req.params.id
          }
        });
        findPost.destroy();
        res.status(200).json(findPost)
      }catch(err){
        res.status(500).json(err);
      }
})

module.exports = router;
