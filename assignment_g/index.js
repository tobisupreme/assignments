const http = require('http')
const { createUser, login, getAllUsers } = require('./routes/users')
const { createBook, deleteBook, loanOutBook, returnBook, updateBook } = require('./routes/books')
const authenticate = require('./auth')

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
    authenticate(req, res).then(() => getAllUsers(req, res))
    return
  }
  if (REQ_URL === '/users/create' && REQ_METHOD === 'post') {
    createUser(req, res)
    return
  }

  // books route(s)
  if (REQ_URL === '/books/create' && REQ_METHOD === 'post') {
    createBook(req, res)
    return
  }
  if (REQ_URL === '/books/delete' && REQ_METHOD === 'delete') {
    deleteBook(req, res)
    return
  }
  if (REQ_URL === '/books/loanout' && REQ_METHOD === 'post') {
    loanOutBook(req, res)
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
