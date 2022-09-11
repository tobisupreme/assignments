const fs = require('fs')
const path = require('path')
const { authenticate, getBooks, existsInStore } = require('../utils')

// get path to books.json
let booksStorePath = path.dirname(__filename).split(path.sep).slice(0, -1)
booksStorePath.push('db', 'books.json')
booksStorePath = booksStorePath.join(path.sep)

// create book
function createBook(req, res, newBook) {
  if (!newBook) {
    res.writeHead(400)
    throw new Error()
  }

  try {
    fs.readFile(booksStorePath, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500)
        res.end({ error: 'server error' })
        return
      }

      const books = JSON.parse(data)

      for (let i = 0; i < newBook.length; i++) {
        newBook[i].id = i + 1
        books.push(newBook[i])
      }

      fs.writeFile(booksStorePath, JSON.stringify(books), (err) => {
        if (err) {
          res.writeHead(500)
          res.end(JSON.stringify({ error: 'Internal Server Error. Could not save book(s)' }))
          return
        }

        res.writeHead(201)
        const response = {}
        response.message = 'Successfully added book(s)'
        response.books = []
        for (let i = 0; i < newBook.length; i++) {
          response.books.push(newBook[i])
        }
        res.end(JSON.stringify(response))
      })
    })
  } catch (err) {
    res.writeHead(500)
    const response = { error: 'Some error occured on server. Sorry my friend' }
    res.end(JSON.stringify(response))
  }
}

// delete book
function deleteBook(req, res) {
  res.writeHead(204)
  const response = { message: 'You successfully sent a DELETE request to the books/delete route' }
  res.end(JSON.stringify(response))
}

// loan out book
function loanOutBook(req, res) {
  res.writeHead(201)
  const response = { message: 'You successfully sent a POST request to the books/loanout route' }
  res.end(JSON.stringify(response))
}

// return book
function returnBook(req, res) {
  res.writeHead(201)
  const response = { message: 'You successfully sent a POST request to the books/return route' }
  res.end(JSON.stringify(response))
}

// update book
function updateBook(req, res) {
  res.writeHead(201)
  const response = { message: 'You successfully sent a PUT request to the books/update route' }
  res.end(JSON.stringify(response))
}

module.exports = { createBook, deleteBook, loanOutBook, returnBook, updateBook }
