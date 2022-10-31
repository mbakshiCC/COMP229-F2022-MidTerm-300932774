// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
    // find all books in the books collection
    book.find((err, books) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('books/index', {
                title: 'Books',
                books: books
            });
            console.log(books); //MB: Prints the value of books   
        }
    });

});
//  GET the Book Details page in order to add a new Book
// The 
router.get('/add', (req, res, next) => {
    let books = require('../models/books');
    res.render('books/details', { title: 'Add a new  Book', books }) // MB takes the user input

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
    console.log(req); // takes the format from models/books.js
    let newBook = book({
        "Title": req.body.title,
        "Author": req.body.author,
        "Price": req.body.price,
        "Genre": req.body.genre
    });
    book.create(newBook, (err, Book) => { // MB will create the records field
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the book list
            res.redirect('/books');
        }
    });

});
// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    let id = req.params.id; // MB stores the user input here
    book.findById(id, (err, bookToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //show the edit view
            res.render('books/details', { title: 'Edit Book', books: bookToEdit })
        }
    });
});
// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    let id = req.params.id
    console.log(req);

    let updatedBook = book({
        "_id": id,
        "Title": req.body.title,
        "Author": req.body.author,
        "Price": req.body.price,
        "Genre": req.body.genre
    });
    book.updateOne({ _id: id }, updatedBook, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the book list
            res.redirect('/books');
        }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    book.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the book list
            res.redirect('/books');
        }
    });
});


module.exports = router;