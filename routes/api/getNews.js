let express = require('express');
let router = express.Router();

let User = require('../../models/User');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4c8d1cf5242a4f4a807d0974f79871c5');

//myToken:4c8d1cf5242a4f4a807d0974f79871c5
//site:https://newsapi.org/
router.get('/', function (req, res, next) {
    let jsonResponse = {};
    let intrests = '';
    if (req.query.token || req.body.token) {


         User.getUserByToken(req.query.token || req.body.token, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.send({status: "fail", message: 'Unknown Token'});
            }

            //reading user tags and appending them in the response
            user.tags.forEach((intrest, index) => {

                // if (index === user.tags.length - 1) {
                //     intrests=intrests+intrest;
                // }else{
                //     intrests=intrests+intrest+',';
                // }
                intrests = intrest;
            });

            newsapi.v2.topHeadlines({
                //    sources: 'bbc-news,the-verge',
                q: intrests,
                sortBy: 'publishedAt',       //sortBy: 'relevancy'
                // category: 'business',
                language: 'en'
                // country: 'us'
            }).then(response => {


                //this is done as foreach doesnot provide a callback

                res.send(response);

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