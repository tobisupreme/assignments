const { Router } = require('express')
const router = new Router()
const booksController = require('../controllers/books.controllers')

// create book
router.route('/create').post(booksController.createBook)

// delete book
router.route('/delete').delete(booksController.deleteBook)

// loan out book
router.route('/loanout').post(booksController.loanOutBook)

// return book
router.route('/return').post(booksController.returnBook)

// update book
router.route('/update').put(booksController.updateBook)

module.exports = router
