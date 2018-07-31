let express = require('express');
let router = express.Router();


let User = require('../../models/User');
let Videos = require('../../models/Videos');

router.post('/', function (req, res, next) {

    User.getUserByToken(req.query.token || req.body.token, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.send({status: "fail", message: 'Unknown Token'});
        }

        Videos.getVideos(user.contentLikings, user.tags,res);

    });
});

module.exports = router;