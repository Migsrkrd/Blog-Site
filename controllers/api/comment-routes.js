const router = require('express').Router();
const { Comments, BlogPosts, Users } = require('../../models');
const { findAll } = require('../../models/comments');

// CREATE new user

router.get('/', async (req, res) => {
    try {
        const usersdb = await Comments.findAll({
            include: [
                {
                    model: BlogPosts,
                    attributes: ['title', 'content', 'blog_date', 'user_id'],
                },
            ]
        });
        res.status(200).json(usersdb)
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const commentsdb = await Comments.create({
            blog_id: req.body.blog_id,
            user_name: req.body.user_name,
            comment: req.body.comment,
            comment_date: req.body.comment_date
        });
            res.status(200).json(commentsdb)

    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'server error'})
    }
})

module.exports = router;