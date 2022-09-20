require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')

const { connectDatabase } = require('./db')
connectDatabase()

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({ message: 'success' })
})

module.exports = app
