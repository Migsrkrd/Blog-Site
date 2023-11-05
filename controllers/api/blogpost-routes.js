const router = require('express').Router();
const { BlogPosts } = require('../../models');
const { findAll } = require('../../models/BlogPosts');

// CREATE new user

router.get('/', async (req, res) => {
    try {
        const usersdb = await BlogPosts.findAll();
        res.status(200).json(usersdb)
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

module.exports = router;
