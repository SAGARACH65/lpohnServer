let express = require('express');
let router = express.Router();

/* GET home page. */
router.use('/', function (req, res, next) {

    next();
});


router.get('/', function (req, res, next) {


});

module.exports = router;
