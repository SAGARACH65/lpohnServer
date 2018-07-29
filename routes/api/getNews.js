let express = require('express');
let router = express.Router();

let User = require('../../models/User');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4c8d1cf5242a4f4a807d0974f79871c5');

router.get('/', function (req, res, next) {
    let jsonResponse = [];
    if (req.query.token || req.body.token) {

        User.getUserByToken(req.query.token || req.body.token, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.send({status: "fail", message: 'Unknown Token'});
            }

            //reading user tags and appending them in the response
            user.tags.forEach((intrest, index) => {

                //delay is added so that all results are added onto the array
                setTimeout(function () {
                    newsapi.v2.topHeadlines({
                        q: intrest,
                        sortBy: 'publishedAt',
                        language: 'en'
                    }).then(response => {

                        response.articles.map((data) => {
                            jsonResponse.push(data);
                        });

                        //this is done as foreach doesnot provide a callback
                        if (index === user.tags.length - 1) {
                            res.json(JSON.parse(JSON.stringify(jsonResponse)));
                            // res.json({status: "success",answer:jsonResponse});
                            res.send();
                        }
                    });
                }, 300);
            });
        });

    } else {
        res.send({
            status: "fail",
            message: "token not available"
        });
    }
});

module.exports = router;