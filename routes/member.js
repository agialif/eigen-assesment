var express = require('express');
var memberRoute = express.Router();
var {
    signup,
    login
} = require('../controler/members')

memberRoute.route('/signup')
.post(signup)

memberRoute.route('/login')
.post(login)

module.exports = memberRoute;

