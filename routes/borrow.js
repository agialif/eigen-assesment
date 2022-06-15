const borrowBooks = require('../controler/borrow')
const express = require('express')
var borrowRoute = express.Router();

borrowRoute.route('/')
.post(borrowBooks)

module.exports = borrowRoute