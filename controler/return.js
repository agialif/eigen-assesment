const Books = require('../model/books')
const Members = require('../model/members')
const Transactions = require('../model/transaction')

const returning = (async(req, res) => {
    const bookBorrowed = await Transactions.findOne({bookCode: req.body.bookCode})
    if (bookBorrowed) {
        code = req.body.bookCode
        await Books.findOneAndUpdate({code}, {
            $inc: {stock: 1}
        })
        name = req.body.member
        Members.findOneAndUpdate({name}, {
            $inc: {books: -1}
        })
        .then(() => {
            bookCode = req.body.bookCode
            returndate = new Date()
            Transactions.findOneAndUpdate({bookCode}, 
                {returnDate: returndate},
                {new: true})
                .then((result)=>{
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(result);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500);
                    res.end("Error : ", err);
                });
        })
    }
    else return res.status(400).json({error: "Book unavailable"})
})

module.exports = returning;


