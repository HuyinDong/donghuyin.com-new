/**
 * Created by dongyin on 8/22/15.
 */
var index = require('../controllers/index.server.controller');
var management = require('../controllers/management.server.controller');
var login = require('../controllers/login.server.controller');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var connection = require('../../config/mysql');
var mysql = require('mysql');

module.exports = function(app){
    passport.use(new LocalStrategy(
        function(username, password, done) {
            connection.query("select * from p_admin where username = '"+username+"'",function(err,user){
                console.log(user);
               if(err){
                   console.log(err);
                   return done(err);
               }
                if(user.length == 0){
                    return done(null,false,{message:"Invalid Username or Password"});
                }
                if(user[0].password != password){
                    return done(null,false, {message : "Invalid Username or Password"});
                }
                return done(null,user[0]);
            });

        }
    ));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        done(null, id);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/',index);
    app.post('/login',function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            // Redirect if it fails
            if (!user) {
                return res.redirect('/login'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                // Redirect if it succeeds
                return res.render('management');
            });
        })(req, res, next);
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

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    app.get('/mylife', function(req,res,next){
        res.render('mylife');
    })


};

