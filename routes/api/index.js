let router = require('express').Router();

// router.use('/', require('./users'));
router.use('/getnews', require('./getNews'));
router.use('/login', require('./login'));
router.use('/register', require('./Regster'));
router.use('/askQuestion',require('./askQuestion'));
router.use('/answerQuestion',require('./answerQuestion'));
router.use('/getQuestions',require('./getQuestions'));
module.exports = router;