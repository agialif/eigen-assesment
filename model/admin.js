const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var adminSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
