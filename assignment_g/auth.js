const fs = require('fs')
const path = require('path')
const userStorePath = path.join(__dirname, 'db', 'users.json')

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

function authenticate(req, res, role) {
  return new Promise(async (resolve, reject) => {

    // get users
    const users = await getUsers()

    // get data from request
    const rawData = []
    req.on('data', (chunk) => rawData.push(chunk))
    req.on('end', async () => {
      const data = Buffer.concat(rawData).toString()
      const parsedData = JSON.parse(data)

      // check for user with matching credentials
      const check = users.find((user) => user.username.toLowerCase() === parsedData.username && user.password === parsedData.password)

      if (check) {
        // if route is login
        if (!role && req.url.toLowerCase() === '/login') {
          resolve(check)
          return
        }

        if (role === check.role) {
          resolve('correct credentials')
          return
        }
      } else {
        reject({ error: 'incorrect username or password' })
        return
      }
    })
  })
}

module.exports = authenticate
