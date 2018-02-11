var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
    //tag specfies the area of intrest to whom the news is to be sent
    tag:String,
    title: String,
    a_date: Date,
    news:String
});

module.exports = mongoose.model('CurrentNews', NewsSchema );