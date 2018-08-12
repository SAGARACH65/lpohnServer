var express = require('express');
var app = express();
let router = express.Router();
var path = require('path');

// viewed at http://localhost:8080
router.get('/', function(req, res) {

    res.sendFile(path.join(__dirname +'/index.html'));
});



module.exports = router;