const Books = require('../model/books')

const postBooks = (req, res) => {
    Books.create(req.body)
    .then((books) => {
        res.status(200)
        res.setHeader('Content-Type','application/json')
        res.json(books)
    })
    .catch((err) => {
        console.log(err);
        res.send(err).status(500)
    })
}

const updateBooks = (req, res) => {
    code = req.body.code;
    Books.findOneAndUpdate(
        code ,
        { $set : req.body},
        { new : true}
        )
        .then((book) => {
            console.log('Book updated', book);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(book);
        })
        .catch((err) => {
            console.log(err);
            res.send(err).status(500)
        })
}

const getBooks = (req, res) => {
    Books.find({stock: 1})
    .then((books) => {
        res.status(200)
        res.setHeader('Content-Type','application/json')
        res.json(books)
    })
    .catch((err) => {
        console.log(err);
        res.send(err).status(500)
    })
}

module.exports = {
    postBooks,
    updateBooks,
    getBooks
}