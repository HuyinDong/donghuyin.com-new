/**
 * Created by dongyin on 8/22/15.
 */
var index = require('../controllers/index.server.controller');
var management = require('../controllers/management.server.controller');
var login = require('../controllers/login.server.controller');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');


module.exports = function(app){
    passport.use(new Strategy(
        function(username, password, cb) {
            db.users.findByUsername(username, function(err, user) {
                if (err) { return cb(err); }
                if (!user) { return cb(null, false); }
                if (user.password != password) { return cb(null, false); }
                return cb(null, user);
            });
        }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function(id, cb) {
        db.users.findById(id, function (err, user) {
            if (err) { return cb(err); }
            cb(null, user);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/',index);
    app.post('/login',
        passport.authenticate('local', { failureRedirect: '/invalid' }),
        function(req,res,next){
            res.render('management');
            // res.redirect('/management');
        });
    app.get('/login',function(req,res){
        res.redirect('/invalid');
    });
    app.get('/management',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req,res,next){
            res.render('management');
        });
    app.get('/invalid',function(req,res){
        res.render('invalid');
    });
};

