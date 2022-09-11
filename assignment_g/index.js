const http = require('http')
const fs = require('fs')
const path = require('path')

const userStorePath = path.join(__dirname, 'db', 'users.json')
let users = []

function createUser(req, res) {
  console.log('creating user...')
  const body = []

  // get data from request
  req.on('data', (data) => {
    body.push(data)
  })

  req.on('end', () => {
    const parsedData = Buffer.concat(body).toString()
    const jsonData = JSON.parse(parsedData)

    // read data from users.json
    fs.readFile(userStorePath, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500)
        res.end(JSON.stringify({ error: 'Internal Server Error. Could not save user' }))
        return
      }

      // and store it in
      const userStore = JSON.parse(data)

      // check if username to add already exists in users.json
      const existsInStore = (store, newValue) => {
        const check = store.find((user) => user.username.toLowerCase() === newValue.username.toLowerCase())
        if (check) {
          return true
        }
        return false
      }

      const check = existsInStore(userStore, jsonData)

      // create a new user if not exists
      if (!check) {
        const newUser = {
          firstName: jsonData.firstName || '',
          lastName: jsonData.lastName || '',
          username: jsonData.username,
          email: jsonData.email,
          role: 'standard',
        }
        userStore.push(newUser)

        // save new users.json
        fs.writeFile(userStorePath, JSON.stringify(userStore), (err) => {
          if (err) {
            res.writeHead(500)
            res.end(JSON.stringify({ error: 'Internal Server Error. Could not save user' }))
            return
          }

          res.writeHead(201)
          res.end(JSON.stringify({ message: 'User successfully added', user: newUser }))
        })
        return
      } else {
        res.writeHead(400)
        res.end(JSON.stringify({ error: `The username ${jsonData.username} is already taken` }))
        return
      }
    })
  })
}

function getAllUsers(req, res) {
  res.writeHead(200)
  const response = { message: 'You successfully sent a GET request to the /users route' }
  res.end(JSON.stringify(response))
}

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

function handleServerRequest(req, res) {
  // Set response header
  res.setHeader('Content-Type', 'application/json')
  const REQ_URL = req.url.toLowerCase()
  const REQ_METHOD = req.method.toLowerCase()

  // users route(s)
  if (REQ_URL === '/users' && REQ_METHOD === 'get') {
    getAllUsers(req, res)
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
