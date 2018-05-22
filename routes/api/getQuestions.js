let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let Questions = require('../../models/Questions');
let User = require('../../models/User');

//as database query brings a lot of repetative data we eliminate questions by tags alredy sent
let sentTags = [];

let jsonResponse = [];

router.post('/', function (req, res, next) {

    User.getUserByToken(req.query.token || req.body.token, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.send({status: "fail", message: 'Unknown Token'});
        }
        for (let i = 0; i < user.tags.length; i++) {
            //delay is added so that both results are added onto the array
            setTimeout(function () {

            }, 100);

            Questions.getQuestions(user.tags[i], function (err, questions) {
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
                    questions.map((data) => {
                        if (!sentTags.includes(data.id)) {
                            jsonResponse.push(data);
                            sentTags.push(data.id);
                        }
                    });

                    if (i === user.tags.length - 1) {
                        res.send(JSON.parse(JSON.stringify(jsonResponse)));
                    }
                }
            });
        }
    });
});

module.exports = router;