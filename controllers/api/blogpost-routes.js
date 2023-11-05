const router = require('express').Router();
const { BlogPosts, Comments } = require('../../models');
const { findAll } = require('../../models/BlogPosts');

// CREATE new user

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
        console.error(err);
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    // try {
    //     const blogsdb = await BlogPosts.create()
    // }
})

module.exports = router;
