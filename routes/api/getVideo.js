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

        Videos.getVideos(user.contentLikings, function (err, videos) {
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
                res.json(output);
                res.send();
            }
            else {

//TODO send video by recommender engineget details of all the videos sent by the recommender engine
                //the engine only sends the name of the videos
                //find and send all the video information

                res.send(JSON.parse(JSON.stringify(videos)));


            }
        });

    });
});

module.exports = router;