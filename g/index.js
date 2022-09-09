const http = require('http')

function createuser(req, res) {
  res.writeHead(201)
  const response = { message: 'You successfully sent a POST request to the route' }
  res.end(JSON.stringify(response))
}

function getAllUsers(req, res) {
  res.writeHead(200)
  const response = { message: 'You successfully sent a GET request to the route' }
  res.end(JSON.stringify(response))
}

function handleServerRequest(req, res) {
  // Set response header
  res.setHeader('Content-Type', 'application/json')

  // 
  if (req.url === '/users' && req.method === 'GET') {
    getAllUsers(req, res)
    return
  }
  if (req.url === '/users' && req.method === 'POST') {
    createuser(req, res)
    return
  }

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
