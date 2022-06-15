var express = require('express');
var booksRoute = express.Router();
var {
    postBooks,
    updateBooks,
    getBooks
} = require('../controler/books')

booksRoute.route('/')
.post(postBooks)
.get(getBooks)
.put(updateBooks)

module.exports = booksRoute;