let mongoose = new require('mongoose');
const uuidv4 = require('uuid/v4');
let User = require('./User');
let recommend = require('../recommendation_engine/recommender');
//Define a schema
let Schema = mongoose.Schema;

let VideosSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
    title: String,
    details: String,
    uploadedDate: {type: Date, default: Date.now},
    tags: [{
        type: String
    }],
    uploadedBY: String,
    imageLink: String

    //TODO commentts add later
    // answers: [{
    //     answeredBy: String,
    //     answer: String,
    //     answeredDate: {type: Date, default: Date.now}
    // }]
});

let Videos = module.exports = mongoose.model('Videos', VideosSchema);

module.exports.addVideo = function (newVideo, callback) {
    //generating a new random id for each video
    newVideo.id = uuidv4();

    //adding updated tags to the old tags
    // newTags.map(value => {
    //     if (!savedTags.includes(value)) {
    //         savedTags.push(value);
    //     }
    //
    // });

    newVideo.save(callback);

};

module.exports.returnVideos = function () {
    Videos.find({}, function (err, videos) {
        return videos;
    });
};

module.exports.getVideos = function (userProfile, res) {


    Videos.find({}, function (err, videos) {

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
            let recommendedVideos = recommend.getRecommendedVideos(userProfile, videos);
            let videoList = [];
            recommendedVideos.map(rec => {
                for (let item in rec) {
                    let obj = {};

                    if (rec[item] > 0) {
                        videos.map(x => {
                            if (item === x.title) {
                                obj['title'] = x.title;
                                obj['details'] = x.details;
                                obj['uploadedDate'] = x.uploadedDate;
                                obj['uploadedBY'] = x.uploadedBY;
                                obj['imageLink'] = x.imageLink;
                            }
                        });
                        videoList.push(obj);
                    }
                }
            });
            res.send(JSON.parse(JSON.stringify(videoList)));
        }
    });
};
