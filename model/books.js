const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var bookSchema = new Schema({
    code : {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
})

var Books = mongoose.model('Books', bookSchema);

module.exports = Books
