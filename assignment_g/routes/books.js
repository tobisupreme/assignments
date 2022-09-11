const fs = require('fs')
const path = require('path')
const { authenticate, getBooks, existsInStore, getMaxId } = require('../utils')

// get path to books.json
let booksStorePath = path.dirname(__filename).split(path.sep).slice(0, -1)
booksStorePath.push('db', 'books.json')
booksStorePath = booksStorePath.join(path.sep)

// create book
function createBook(req, res, { books }) {
  console.log(books, '🎒 line 12')
  // if request data isn't properly formatted
  if (!books) {
    res.writeHead(400)
    throw new Error()
  }

  try {
    // get books in books.json
    fs.readFile(booksStorePath, 'utf-8', async (err, data) => {
      if (err) {
        res.writeHead(500)
        res.end({ error: 'server error' })
        return
      }

      const dbBooks = JSON.parse(data)
      const resBooks = []

      // get maximum id
      let maxId = await getMaxId()

      // add new book(s)
      for (let i = 0; i < books.length; i++) {
        maxId++
        const newEntry = {
          id: maxId,
          author: books[i].author,
          title: books[i].title,
          year: books[i].year,
          isLoaned: false,
        }
        dbBooks.push(newEntry)
        resBooks.push(newEntry)
      }

      // save book(s)
      fs.writeFile(booksStorePath, JSON.stringify(dbBooks), (err) => {
        if (err) {
          res.writeHead(500)
          res.end(JSON.stringify({ error: 'Internal Server Error. Could not save book(s)' }))
          return
        }

        res.writeHead(201)
        const response = {}
        response.message = 'Successfully added book(s)'
        response.books = resBooks
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
async function loanOutBook(req, res) {
  try {
    // get book id from request
    const bookId = Number(req.url.split('out/')[1])

    // get books from books.json
    const dbBooks = await getBooks()

    // check if isLoaned
    const bookIndex = dbBooks.findIndex((book) => book.id === bookId)

    if (dbBooks[bookIndex].isLoaned) {
      res.writeHead(405)
      const response = { message: `${bookToLoan.title} is currently out of the library` }
      res.end(JSON.stringify(response))
      return
    }

    // change isLoaned to true
    dbBooks[bookIndex] = { ...dbBooks[bookIndex], isLoaned: true }

    // save to books.json
    fs.writeFile(booksStorePath, JSON.stringify(dbBooks), (err) => {
      if (err) {
        res.writeHead(500)
        res.end({ error: 'server error' })
        return
      }

      res.writeHead(202)
      const response = { message: `Your request to borrow ${dbBooks[bookIndex].title} is accepted.` }
      res.end(JSON.stringify(response))
    })
  } catch (err) {
    res.writeHead(500)
    throw new Error()
  }
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
