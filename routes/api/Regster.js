let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// let User = mongoose.model('User');
let User = require('../../models/User');


router.post('/', function (req, res, next) {
    // Get the validation result whenever you want; see the Validation Result API for all options!

    let newUser = new User( {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        tags:req.body.tags
    });
    User.createUser(newUser, function (err, user) {
        if (err) {
            res.json({
                staus: 0,
                message: "Username Taken"
            });
            res.send();

        }
        else {
            res.json({status: 200, message: "user registered"});
            res.send();
        }
    });
});

//     User.create({
//         username: req.body.username,
//         email: req.body.username,
//         password: req.body.password,
//         tags: req.body.username
//     }).then(function (msg) {
//         if (msg) {
//             console.log("User added");
//             return res.send({
//                 status: 200,
//                 msg: msg
//
//             });
//
//         }
//
//     });


module.exports = router;
