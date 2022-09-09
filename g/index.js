const http = require('http')

function handleServerRequest(request, response) {
  console.log(request)
  response.writeHead(200)
  response.write("Server chilling because I'm cool!\n")
  response.end('Hello from the server side!')
}

// Create server
const server = http.createServer(handleServerRequest)
const PORT = 3030
const HOST_NAME = 'localhost'

server.listen(PORT, HOST_NAME, () => {
  console.log(`Server is listening on ${HOST_NAME}:${PORT}`)
})
