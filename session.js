const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const app = express();

app.use(session({
    secret: 'secret#user',
    resave : false,
    saveUninitialized : false,
}))

app.use(passport.initialize());
app.use(passport.session());

module.exports = app;