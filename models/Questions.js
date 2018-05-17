let mongoose =new  require('mongoose');
const uuidv4 = require('uuid/v4');

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

module.exports.addQuestion = function (newQuestion, callback) {
    //generating a new random id for each question
    newQuestion.id = uuidv4();
    newQuestion.save(callback);
};
module.exports.addAnswer = function (username,answer, questionID, callback) {
    Questions.update({id:questionID}, {$push: {answers: {answer:answer,answeredBy:username}}}, callback);
};

module.exports.getQuestions = function (interests, callback) {
Questions.find({tags:interests},callback);



};