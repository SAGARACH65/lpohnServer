let router = require('express').Router();

// router.use('/', require('./users'));
router.use('/getnews', require('./getNews'));

router.use('/register', require('./Regster'));
router.use('/askQuestion',require('./askQuestion'));
router.use('/answerQuestion',require('./answerQuestion'));
router.use('/getQuestions',require('./getQuestions'));
router.use('/addLikeDislike',require('./likeDislikeVideo'));
router.use('/login', require('./login'));
router.use('/viewVids', require('./viewedVideo'));
module.exports = router;