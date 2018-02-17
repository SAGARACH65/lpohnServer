let express = require('express');
let router = express.Router();
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

const jwt = require('jsonwebtoken');
let User = require('../../models/User');

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


passport.use(new LocalStrategy({passReqToCallback: true},
    function (req, username, password, done) {
        // let a =req.body.email;
        let isEmail = validateEmail(username);

        //checking if user entered username or email
        if (isEmail) {
            User.getUserByEmail(username, function (err, user) {
                if (err) throw err;
                if (!user) {
                    return done(null, false, {status: "fail", message: 'Unknown User'});
                }

                User.comparePassword(password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
                        //putitng the token back in the dataabse
                        user.token = token;


                        return done(null, user, {
                            status: "success",
                            token: token
                        });

                    } else {
                        return done(null, false, {status: "fail", message: 'Invalid password'});
                    }
                });
            });
        } else {
            User.getUserByUsername(username, function (err, user) {
                if (err) throw err;
                if (!user) {
                    return done(null, false, {message: 'Unknown User'});
                }

                User.comparePassword(password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
                        //putitng the token back in the dataabse
                        user.token = token;


                        return done(null, user, {
                            status: "success",
                            token: token
                        });
                    } else {
                        //  sendErrorMessage();
                        return done(null, false, {status: "fail", message: 'Invalid password'});
                    }
                });
            });
        }

    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});


router.post('/', function (req, res, next) {
    if (!req.body.username) {
        return res.status(422).json({status: "fail", errors: {email: "can't be blank"}});
    }

    if (!req.body.password) {
        return res.status(422).json({status: "fail", errors: {password: "can't be blank"}});
    }

    passport.authenticate('local', {session: false}, function (err, user, info) {
        if (err) {
            return res.json({
                status: "fail",
                error: err.message
            });
        }


        if (user) {

            return res.json({
                status: "success",
                token: user.token
            });
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
});

// router.post('/',
//
//     function (req, res, next) {
//         // handle success
//         passport.authenticate('local', {session: false}, (err, user, info) => {
//             if (err || !user) {
//
//                 ///semnding response if error occurs
//
//
//             }
//
//
//             /*
//
//             http://www.passportjs.org/docs/login/
//              */
//             req.login(user, {session: false}, (err) => {
//                 if (err) {
//                     res.send(err);
//                 }
//
//                 // generate a signed son web token with the contents of user object and return it in the response
//
//             });
//         })(req, res);
//     });


/*
* failWithError documented at https://github.com/jaredhanson/passport/issues/126#issuecomment-32333163
*Done because I want to send custom json response to client as this being an API not with flash message
 */
// router.post('/',
//     passport.authenticate('local', {failWithError: true}),
//     function (req, res, next) {
//         // handle success
//         if (req.xhr) {
//             return res.json({id: req.user.id});
//         }
//         return res.redirect('/');
//     },
//     function (err, req, res, next) {
//         // handle error
//         if (req.xhr) {
//             return res.json(err);
//         }
//         return res.redirect('/login');
//     },
//     function (req, res) {
//
//         // res.render('index', {title: 'Express  '});
//
//     });


module.exports = router;
