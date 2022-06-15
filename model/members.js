const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var memberSchema = new Schema({
    code : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    books: {
        type: Number,
        default: "0"
    },
    penalty: {
        type: Date,
        default: null
    }
})

var Members = mongoose.model('Members', memberSchema);

module.exports = Members;
