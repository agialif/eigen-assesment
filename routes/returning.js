const returning = require('../controler/return')
const express = require('express')
var returnRoute = express.Router();

returnRoute.route('/')
.post(returning)

module.exports = returnRoute