const router = require('express').Router();
// const commentRoutes = require('./commentRoutes');
// const reactionRoutes = require('./reactionRoutes');
const userRoutes = require('./userRoutes');

// router.use('/comments', commentRoutes);
// router.use('/reaction', reactionRoutes);
router.use('/users', userRoutes);

module.exports = router;