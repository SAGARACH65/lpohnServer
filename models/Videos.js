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
    answers: [{
        answeredBy: String,
        answer: String,
        answeredDate: {type: Date, default: Date.now}
    }]
});

let Videos = module.exports = mongoose.model('Videos', VideosSchema);

module.exports.addVideo = function (newVideo, token, newTags, savedTags, callback) {
    //generating a new random id for each question
    newVideo.id = uuidv4();
    //adding updated tags to the old tags
    newTags.map(value => {
        if (!savedTags.includes(value)) {
            savedTags.push(value);
        }

    });
    newVideo.save().then(function (value) {

        User.updateTags(token, savedTags, callback);

    }, function (reason) {
        // rejection
    });
};


module.exports.getVideos = function (interests, callback) {
    Videos.find({tags: interests}, callback).sort({askedDate: 'desc'});
};
