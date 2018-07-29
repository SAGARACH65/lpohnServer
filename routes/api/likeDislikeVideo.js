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

        User.updateLikings(req.body.title,parseInt(req.body.like),function (err, question) {
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
                res.json({status: "success", message: "Like/Dislike Added"});
                res.send();
            }
        });
    });


});

module.exports = router;