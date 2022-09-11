const fs = require('fs')
const path = require('path')
const { authenticate, getUsers, existsInStore } = require('../utils')

// get path to users.json
let userStorePath = path.dirname(__filename).split(path.sep).slice(0, -1)
userStorePath.push('db', 'users.json')
userStorePath = userStorePath.join(path.sep)

function login(req, res) {
  authenticate(req, res)
    .then((data) => {
      res.end(JSON.stringify({ messge: `login as ${data.username} with role '${data.role}' successful` }))
    })
    .catch((err) => {
      res.end(JSON.stringify(err))
    })
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
          password: jsonData.password,
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
          const resUser = newUser
          delete resUser.password
          delete resUser.role
          res.end(JSON.stringify({ message: 'User successfully added', user: resUser }))
        })
        return
      } else {
        // send response if user exists
        res.writeHead(409)
        res.end(JSON.stringify({ error: `The username ${jsonData.username} is already taken` }))
        return
      }
    })
  })
}

async function getAllUsers(req, res) {
  res.writeHead(200)
  const response = { message: 'You successfully sent a GET request to the /users route' }
  const users = {
    users: await getUsers()
  }
  response.users = users
  res.end(JSON.stringify(response))
}

module.exports = { createUser, login, getAllUsers }
