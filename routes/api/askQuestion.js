let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Questions = require('../../models/Questions');
let User = require('../../models/User');
let newQuestion;
router.post('/', function (req, res, next) {


    //1st we find the user name by their token and save their name in the question database

    User.getUserByToken(req.query.token || req.body.token, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.send({status: "fail", message: 'Unknown Token'});
        }
        newQuestion = new Questions({
            title: req.body.title,
            details: req.body.details,
            tags: req.body.tags,
            askedBy: user.username,
            id:"0"
        });

        Questions.addQuestion(newQuestion,req.body.token,req.body.tags,user.tags,function (err, question) {
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
                res.json({status: "success", message: "Question Addeds"});
                res.send();
            }
        });
    });


});

module.exports = router;