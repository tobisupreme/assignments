const fs = require('fs')
const path = require('path')

// get path to users.json
let userStorePath = path.dirname(__filename).split(path.sep).slice(0,-1)
userStorePath.push('db', 'users.json')
userStorePath = userStorePath.join(path.sep)

// check for existing user
const existsInStore = (store, newValue) => {
  const check = store.find((user) => user.username.toLowerCase() === newValue.username.toLowerCase())
  if (check) {
    return true
  }
  return false
}

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
      } else { // send response if user exists
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

module.exports = { createUser, getAllUsers }
