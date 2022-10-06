const mongoose = require('mongoose')
const URL = process.env.MONGO

function connectDatabase() {
  mongoose
    .connect(URL)
    .then(() => {
      console.log('Connection to database successful')
    })
    .catch((err) => {
      console.log('Error connecting to database', err.message)
    })
}

module.exports = { connectDatabase }
