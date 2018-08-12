let mongoose = new require('mongoose');
const uuidv4 = require('uuid/v4');
let User = require('./User');

//Define a schema
let Schema = mongoose.Schema;

let QuestionsSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
    title: String,
    details: String,
    askedDate: {type: Date, default: Date.now},
    tags: [{
        type: String
    }],
    askedBy: String,
    answers: [{
        answeredBy: String,
        answer: String,
        answeredDate: {type: Date, default: Date.now}
    }]
});

let Questions = module.exports = mongoose.model('Questions', QuestionsSchema);

module.exports.addQuestion = function (newQuestion, token, newTags, savedTags, callback) {
    //generating a new random id for each question
    newQuestion.id = uuidv4();
    //adding updated tags to the old tags
    newTags.map(value => {
        if (!savedTags.includes(value)) {
            savedTags.push(value);
        }

    });
    newQuestion.save().then(function (value) {

        User.updateTags(token, savedTags, callback);

    }, function (reason) {
        // rejection
    });
};
module.exports.addAnswer = function (username, answer, questionID, callback) {
    Questions.update({id: questionID}, {$push: {answers: {answer: answer, answeredBy: username}}}, callback);
};

module.exports.getQuestions = function (interests, callback) {
    Questions.find({tags: interests}, callback).sort({askedDate: -1});
};
