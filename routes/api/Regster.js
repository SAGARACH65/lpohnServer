let express = require('express');
let router = express.Router();


let User = require('../../models/User');


router.post('/', function (req, res, next) {
    // Get the validation result whenever you want; see the Validation Result API for all options!

    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        tags: req.body.tags,
    });
    User.createUser(newUser, function (err, user) {
        if (err) {
            let output = {

                status: "fail",
                name: err.name,
                message: err.message,
                text: err.toString()

            };


            let statusCode = err.status || 500;
            res.status(statusCode).json(output);
            res.send();


        }
        else {
//TODO update later average user profile
            //adding the average user profile
            let likingQuestions = ['programming is better with node', 'things i regret about node', 'node confrence in eu', 'programming made easier'];
            for (let i = 0; i < likingQuestions.length; i++) {
                User.addLikings(req.body.username, likingQuestions[i], function (err) {
                });
            }

            res.json({status: "success", message: "user registered"});
            res.send();
        }
    });
});

module.exports = router;