require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const usersRoute = require('./routes/users.routes')
const booksRoute = require('./routes/books.routes')

const { connectDatabase } = require('./config/db')
connectDatabase()

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/books', booksRoute)
app.use('/api/users', usersRoute)

app.get('/', (req, res) => {
  res.json({ message: 'success' })
})

module.exports = app
