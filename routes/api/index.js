let router = require('express').Router();

// router.use('/', require('./users'));
router.use('/getnews', require('./getnews'));
router.use('/login', require('./login'));
router.use('/register', require('./Regster'));


module.exports = router;