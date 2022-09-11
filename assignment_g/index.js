const http = require('http')
const { createUser, login, getAllUsers } = require('./routes/users')
const { createBook, deleteBook, loanOutBook, returnBook, updateBook } = require('./routes/books')
const { authenticate } = require('./utils')

function handleServerRequest(req, res) {
  // Set response header
  res.setHeader('Content-Type', 'application/json')
  const REQ_URL = req.url.toLowerCase()
  const REQ_METHOD = req.method.toLowerCase()

  // users route(s)
  if (REQ_URL === '/login' && REQ_METHOD === 'post') {
    login(req, res)
    return
  }
  if (REQ_URL === '/users' && REQ_METHOD === 'get') {
    authenticate(req, res, ['admin'])
      .then(() => getAllUsers(req, res))
      .catch((err) => {
        res.end(JSON.stringify(err))
      })
    return
  }
  if (REQ_URL === '/register' && REQ_METHOD === 'post') {
    createUser(req, res)
    return
  }

  // books route(s)
  if (REQ_URL === '/books/add' && REQ_METHOD === 'post') {
    authenticate(req, res, ['admin'])
      .then((data) => {
        createBook(req, res, data)
      })
      .catch((err) => {
        res.end(JSON.stringify({ error: 'corrupt data received' }))
      })
    return
  }
  if (REQ_URL === '/books/delete' && REQ_METHOD === 'delete') {
    deleteBook(req, res)
    return
  }
  if (REQ_URL.startsWith('/books/loanout/') && REQ_METHOD === 'post') {
    authenticate(req, res, ['admin', 'standard'])
      .then((data) => loanOutBook(req, res))
      .catch((err) => {
        res.end(JSON.stringify({ error: 'server cannot process your request. Please try again later' }))
      })
    return
  }
  if (REQ_URL === '/books/return' && REQ_METHOD === 'post') {
    returnBook(req, res)
    return
  }
  if (REQ_URL === '/books/update' && REQ_METHOD === 'put') {
    updateBook(req, res)
    return
  }

  // Default response (if all if-blocks above are skipped)
  res.writeHead(404)
  const response = { message: 'What are you talking about, bro?' }
  res.end(JSON.stringify(response))
}

// Create server
const server = http.createServer(handleServerRequest)
const PORT = 3030
const HOST_NAME = 'localhost'

server.listen(PORT, HOST_NAME, () => {
  console.log(`Server is listening on ${HOST_NAME}:${PORT}`)
})
