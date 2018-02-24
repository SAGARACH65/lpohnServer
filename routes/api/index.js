let router = require('express').Router();

// router.use('/', require('./users'));
router.use('/getnews', require('./getNews'));
router.use('/login', require('./login'));
router.use('/register', require('./Regster'));


module.exports = router;