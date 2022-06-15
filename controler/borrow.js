const Books = require('../model/books')
const Members = require('../model/members')
const Transactions = require('../model/transaction')

var borrowBooks = (async(req, res) => {
    //check book is available or borrowed
    // const bookAvailable = await Books.findOne({code: req.body.bookCode})
    // if (bookAvailable) {
    //     if (bookAvailable.stock < 1) return res.status(400).json({error: "Book has been borrowed"})
    // } 
    // else if (!bookAvailable) return res.status(400).json({error: "Book not available"})

    // //check the name of member and borrow limit
    // const borrowLimit = await Members.findOne({name: req.body.member})
    // if (borrowLimit) {
    //     if (borrowLimit.books == 2) return res.status(400).json({error: "You have reach limit for borrowing books"})
    // } 
    // else if (!borrowLimit) return res.status(400).json({error: "Wrong member name"})
    //check the member if ever borrowing books, if yet, direct borrow transaction, if they already borrow, check the penalty
    const gotPenalty = await Members.findOne({name: req.body.member})
        if (gotPenalty.penalty) {
            let penaltyDay = gotPenalty.penalty
            let today = new Date()
            let oneDay = 24 * 60 * 60 * 1000;
            const diffDays = Math.ceil(Math.abs((today- penaltyDay) / oneDay));
            if (diffDays <= 3) return res.status(400).json({error: "There are still" +diffDays+ "days left"})
        }
    code= req.body.bookCode
    member = req.body.member
    const borrowed = await Transactions.findOne({code}, {member})
    if (!borrowed) {
        code = req.body.bookCode
        const bookStock = await Books.findOne({code})
        if (!bookStock) return res.status(400).json(bookStock)
        Transactions.create(req.body)
        .then(async(borrow) => {
            res.status(200)
            res.json(borrow)
            name = req.body.member
            await Members.findOneAndUpdate({name}, {
                $inc: {books: 1}
            })
            code = req.body.bookCode
            await Books.findOneAndUpdate({code}, {
                $inc: {stock: -1}
             })   
        })
        .catch((err) => {
            console.log(err);
            res.send(err).status(500)
        })
    }
    else if(borrowed){
        if (borrowed.returnDate == null) {
            let borrowdate = borrowed.borrowDate;
            let returndate = new Date()
            let oneDay = 24 * 60 * 60 * 1000;
            const diffDays = Math.ceil(Math.abs((returndate- borrowdate) / oneDay));
            if (diffDays < 7){
                Transactions.create(req.body)
                .then(async(borrow) => {
                    name = req.body.member
                    await Members.findOneAndUpdate({name}, {
                        $inc: {books: 1}
                    })
                    code = req.body.bookCode
                    await Books.findOneAndUpdate({code}, {
                        $inc: {stock: -1}
                     }) 
                    res.status(200)
                    res.json(borrow)  
                })
                .catch((err) => {
                    console.log(err);
                    res.send(err).status(500)
                })
            }
            else {
                let today = new Date;
                let penaltyDay = new Date(today)
                penaltyDay.setDate(today.getDate() + 3)
                name = req.body.member
                Members.findOneAndUpdate({name},
                    {penalty: penaltyDay},
                    {new: true})
                return res.status(400).json({error: "You got penalty, you can borrow after 3 days" + penaltyDay}) 
                
            }
        }
        else if(borrowed.returnDate != null){
            let borrowdate = borrowed.borrowDate;
            let returndate = borrowed.returnDate;
            let oneDay = 24 * 60 * 60 * 1000;
            let member = await Members.findOne({name: req.body.member})
            const diffDays = Math.ceil(Math.abs((returndate- borrowdate) / oneDay));
            if (diffDays < 7 || member.penalty == null){
                Transactions.create(req.body)
                .then(async(borrow) => {
                    res.status(200)
                    res.json(borrow)
                    name = req.body.member
                    await Members.findOneAndUpdate({name}, {
                        $inc: {books: 1}
                    })
                    code = req.body.bookCode
                    await Books.findOneAndUpdate({code}, {
                        $inc: {stock: -1}
                     })   
                })
                .catch((err) => {
                    console.log(err);
                    res.send(err).status(500)
                })
            }
            else {
                let today = new Date;
                let penaltyDay = new Date(today)
                penaltyDay.setDate(today.getDate() + 3)
                name = req.body.member
                Members.findOneAndUpdate({name},
                    {"penalty": penaltyDay},
                    {new: true})
                return res.status(400).json({error: "You got penalty, you can borrow after 3 days"}) 
            }
        }
    }
})

module.exports = borrowBooks;

      