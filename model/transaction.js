const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var transactionSchema = new Schema({
  member: {
    type: String,
    required: true,
  },
  bookCode: {
    type: String,
    required: true,
  },
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
    default: null,
  }
});

var Transactions = mongoose.model("Transactions", transactionSchema);
module.exports = Transactions;
