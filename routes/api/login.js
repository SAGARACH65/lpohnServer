let express = require('express');
let router = express.Router();
const url=require('url');


router.get('/', function (req, res, next) {
    //  var a=req.get('sagar');
     let b= process.env.NODE_ENV;

    res.render('index', {title: 'Express  '});

});



module.exports = router;
