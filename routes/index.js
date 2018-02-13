let router = require('express').Router();

router.use('/api', require('./api'));
router.use('/',require('./users'));
module.exports = router;


