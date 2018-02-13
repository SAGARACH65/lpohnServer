let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
//Define a schema
let Schema = mongoose.Schema;
const saltRounds = 1;
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
        type:String

    }],
    token: Number,
    password: String,
    salt: String
});
 module.exports = mongoose.model('Users', UserSchema);

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.salt = salt;

            // for (let i = 0; i < newUser.tags_temp.length; i++) {
            //     newUser.tags.push();
            // }
            newUser.save(callback);
        });
    });
}