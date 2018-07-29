let mongoose = new require('mongoose');
const uuidv4 = require('uuid/v4');
let User = require('./User');

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


module.exports.getVideos = function (userProfile, callback) {

    //TODO call the recommender engine here and send back to the user
    Videos.find({},function (err,videos) {

        //send videos list and videos to the recommendation engine for evaluation
    });


    //Videos.find({tags: interests}, callback).sort({askedDate: 'desc'});
};
