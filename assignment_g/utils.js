const fs = require('fs')
const path = require('path')
const userStorePath = path.join(__dirname, 'db', 'users.json')
const booksStorePath = path.join(__dirname, 'db', 'books.json')

// get users from users.json
function getUsers() {
  return new Promise((res, rej) => {
    fs.readFile(userStorePath, 'utf-8', (err, users) => {
      if (err) {
        rej(err)
      }
      res(JSON.parse(users))
    })
  })
}

// get books from books.json
function getBooks() {
  return new Promise((res, rej) => {
    fs.readFile(booksStorePath, 'utf-8', (err, books) => {
      if (err) {
        rej(err)
      }
      res(JSON.parse(books))
    })
  })
}

// check for existing user
const existsInStore = (store, newValue) => {
  const check = store.find((user) => user.username.toLowerCase() === newValue.username.toLowerCase())
  if (check) {
    return true
  }
  return false
}

function authenticate(req, res, role) {
  return new Promise(async (resolve, reject) => {
    console.log('authenticating...', req.url)
    // get users
    const users = await getUsers()

    // get data from request
    const rawData = []
    req.on('data', (chunk) => rawData.push(chunk))
    req.on('end', async () => {
      const data = Buffer.concat(rawData).toString()
      const { userDetails, books } = JSON.parse(data)
      const parsedData = userDetails

      try {
        // check for user with matching credentials
        const check = users.find((user) => user.username.toLowerCase() === parsedData.username && user.password === parsedData.password)

        if (check) {
          // if route is login
          if (!role && req.url.toLowerCase() === '/login') {
            resolve(check)
            return
          }

          if (role.includes(check.role)) {
            resolve(books)
            return
          }

          res.writeHead(401)
          reject({ error: 'insufficient priviledges' })
          return
        } else {
          reject({ error: 'incorrect username or password' })
          return
        }
      } catch (err) {
        // if login details are not provided
        res.writeHead(400)
        reject({ error: '?????' })
        return
      }
    })
  })
}

module.exports = { getUsers, existsInStore, authenticate, getBooks }
