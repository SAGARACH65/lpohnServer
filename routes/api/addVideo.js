let express = require('express');
let router = express.Router();


let Videos = require('../../models/Videos');
let User = require('../../models/User');

let newVideo;

router.post('/', function (req, res, next) {

    User.getUserByToken(req.query.token || req.body.token, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.send({status: "fail", message: 'Unknown Token'});
        }
        newVideo = new Videos({
            title: req.body.title,
            details: req.body.details,
            uploadedBY: user.username,
            tags: req.body.tags,
            id:"0"
        });

        Videos.addVideo(newVideo,function (err, question) {
            if (err) {
                let output = {
                    error: {
                        status: "fail",
                        name: err.name,
                        message: err.message,
                        text: err.toString()
                    }
                };
                let statusCode = err.status || 500;
                res.status(statusCode).json(output);
                res.send();
            }
            else {
                res.json({status: "success", message: "Video Addeds"});
                res.send();
            }
        });
    });
});

module.exports = router;