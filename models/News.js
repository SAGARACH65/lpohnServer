let mongoose = require('mongoose');

//Define a schema
let Schema = mongoose.Schema;

let NewsSchema = new Schema({
    //tag specfies the area of intrest to whom the news is to be sent
    tag: String,
    title: String,
    a_date: Date,
    news: String

});

module.exports = mongoose.model('CurrentNews', NewsSchema);