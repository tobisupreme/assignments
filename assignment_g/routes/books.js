function createBook(req, res) {
  res.writeHead(201)
  const response = { message: 'You successfully sent a POST request to the books/create route' }
  res.end(JSON.stringify(response))
}

function deleteBook(req, res) {
  res.writeHead(204)
  const response = { message: 'You successfully sent a DELETE request to the books/delete route' }
  res.end(JSON.stringify(response))
}

function loanOutBook(req, res) {
  res.writeHead(201)
  const response = { message: 'You successfully sent a POST request to the books/loanout route' }
  res.end(JSON.stringify(response))
}

function returnBook(req, res) {
  res.writeHead(201)
  const response = { message: 'You successfully sent a POST request to the books/return route' }
  res.end(JSON.stringify(response))
}

function updateBook(req, res) {
  res.writeHead(201)
  const response = { message: 'You successfully sent a PUT request to the books/update route' }
  res.end(JSON.stringify(response))
}

module.exports = { createBook, deleteBook, loanOutBook, returnBook, updateBook }
