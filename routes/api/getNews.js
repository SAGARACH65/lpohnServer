let express = require('express');
let request = require('ajax-request');
let router = express.Router();

let User = require('../../models/User');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4c8d1cf5242a4f4a807d0974f79871c5');


//myToken:4c8d1cf5242a4f4a807d0974f79871c5
//site:https://newsapi.org/
router.get('/', function (req, res, next) {
    let jsonResponse = {};
    if (req.query.token || req.body.token) {

        User.getUserByToken(req.query.token || req.body.token, function (err, user) {
            if (err) throw err;
            if (!user) {
               res.send( {status: "fail", message: 'Unknown Token'});
            }

            //reading user tags and appending them in the response
            // user.tags.type.forEach((intrest, index) => {
            //     //making call to newsapi.org
            //     newsapi.v2.topHeadlines({
            //         //    sources: 'bbc-news,the-verge',
            //         q: intrest,
            //         sortBy: 'publishedAt',       //sortBy: 'relevancy'
            //         // category: 'business',
            //         language: 'en'
            //         // country: 'us'
            //     }).then(response => {
            //         jsonResponse.concat(response);
            //
            //     });
            // });
            // res.send(jsonResponse);

        });


    } else {
        res.send({
            status: "fail",
            message: "token not available"
        });
    }


});

module.exports = router;
