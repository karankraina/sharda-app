var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const { ensureLoggedIn } = require('connect-ensure-login')
import db from '../database-module';

const usersData  = [
    {
        id: 1,
        email: "sample@sample.com",
        password: "password"
    }
]

const getUser = (_email, _password) => {
    return new Promise((resolve, reject) => {
        const user = usersData.find(({email, password}) => (email == _email && password == _password))
        resolve(user)
    })
}
const middleWare = async (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.use((response, next) => {
    //     response.header("Access-Control-Allow-Origin", "*");
    //     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     next();
    // });
    // Passport calls serializeUser and deserializeUser to
    // manage users
    passport.serializeUser(function (user, done) {
        // Use the OID property of the user as a key
        console.log(user)
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    passport.use(new LocalStrategy((username, password, cb) => {
        console.log('Passport middle ware called', username, password)
        getUser(username, password).then((user) => {
            cb(null, user)
        }).catch(error => {
            cb(error)
        })
    }));


    // Initialize Passport!  Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    app.use(passport.initialize());
    app.use(passport.session());

    app.post('/login',
        passport.authenticate('local', { successReturnToOrRedirect: '/welcome' }),
        function (req, res) {
            console.log('ROUTE AFTER AUTHENTICATION........')
            res.redirect('/');
        });

    app.use(ensureLoggedIn('/login'))

}

module.exports = {
    middleWare,
}