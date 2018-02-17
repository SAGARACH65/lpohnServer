let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
//Define a schema
let Schema = mongoose.Schema;
const saltRounds = 10;
let UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    tags: [{
        //name of the intrested tag initially assigned
        type: String

    }],
    token: String,
    password: String,
    //setting the current date of the server
    registeredDate: {type: Date, default: Date.now}

});
let User = module.exports = mongoose.model('Users', UserSchema);


module.exports.getUserByUsername = function (username, callback) {
    let query = {username: username};
    User.findOne(query, callback);
};
module.exports.getUserByEmail = function (email, callback) {
    let query = {email: email};
    User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            // for (let i = 0; i < newUser.tags_temp.length; i++) {
            //     newUser.tags.push();
            // }
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};
