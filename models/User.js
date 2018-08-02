let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
//Define a schema
let Videos = require('./Videos');
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
    //tags is used only for news
    tags: [{
        //name of the intrested tag initially assigned
        type: String

    }],
    //this is used for recomender engine, all the articles and videos the user likes are upadated here
    //it is hte user profile for vector mul withtiplication
    contentLikings: [{

        title: String,
        value: {type: Number, default: 0}

    }],

    token: {type: String},                             //, default:"NA"
    password: String,

    //setting the current date of the server
    registeredDate: {type: Date, default: Date.now}

});
let User = module.exports = mongoose.model('Users', UserSchema);


module.exports.getUserByUsername = function (username, callback) {
    let query = {username: username};
    User.findOne(query, callback);
};
module.exports.getUserByToken = function (token, callback) {
    let query = {token: token};
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
            //
            // //for average user profile
            // //implicitly adding average user profile

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

module.exports.updateTags = function (token, tags, callback) {
    User.update({token: token}, {tags: tags}, callback);

};

//add the user user watches to their profile
module.exports.addLikings = function (username, likings, title, value = 0, callback) {


    //TODO later fix this thing
    // this is a brute force thing
    //i have made a mechanism to add all the videos in contentLikings whenever a user watches a video.
    //i.e whenever a user watches a video all of the new videos in the system will be integated and added into his profile
    let videos = Videos.returnVideos();
    if (videos) {
        videos.map((item) => {
            let isPresent = false;
            let obj = {};
            likings.map(x => {
                if (x.title === item.title) isPresent = true;
            });
            if (!isPresent) {
                obj['title'] = item.title;
                obj['value'] = 0
            }
            likings.push(obj);
        });

        User.update({username: username}, {contentLikings: likings}, callback);
    } else {
        User.update({username:username}, {$push: {contentLikings: {title: title, value: value}}}, callback);
    }
};


//updates the profile according to the users likes or dislikes
module.exports.updateLikings = function (title, like, callback) {
    User.update({'contentLikings.title': title},
        {
            '$set': {
                'contentLikings.$.value': like,

            }
        }, callback);

};
module.exports.addVideoToUserProfile = function (username,title,callback) {
    User.update({}, {$push: {contentLikings: {title: title, value: 0}}},{multi:true},callback);
};