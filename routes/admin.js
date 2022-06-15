var {
    login,
    memberList,
    signup
} = require('../controler/admin')
var express = require('express');
var adminRoute = express.Router();


adminRoute.route('/memberlist')
.get(memberList)

adminRoute.route('/login')
.post(login)

adminRoute.route('/signup')
.post(signup)


module.exports = adminRoute