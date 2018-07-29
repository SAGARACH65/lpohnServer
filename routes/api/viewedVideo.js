//this is just used when ever a user watcehs a video such that we can update the user profile with the title of the videos

let express = require('express');
let router = express.Router();

let User = require('../../models/User');

router.post('/', function (req, res, next) {


    //1st we find the user name by their token and save their name in the question database

    User.getUserByToken(req.query.token || req.body.token, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.send({status: "fail", message: 'Unknown Token'});
        }

        User.addLikings(user.username, req.body.title, function (err, user) {
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
                res.json({status: "success", message: "View Added"});
                res.send();
            }
        });
    });


});

module.exports = router;