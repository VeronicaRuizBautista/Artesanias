const session = require('express-session');
const sessionConfigPassport = require('express').Router();

module.exports = sessionConfigPassport.use(session({
    secret: process.env.KEY_SECRET,
    resave: false,
    saveUninitialized: true
}))