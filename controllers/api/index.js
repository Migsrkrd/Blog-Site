const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogpostRoutes = require('./blogpost-routes');
const commentRoutes = require('./comment-routes')
const sessions = require('./session-data');

//all api routes
router.use('/users', userRoutes);
router.use('/blogposts', blogpostRoutes);
router.use('/comments', commentRoutes);
router.use('/sessions', sessions)

module.exports = router;
