const { Router } = require('express')
const router = new Router()
const usersController = require('../controllers/users.controllers')

// Register
router.route('/register').post(usersController.createUser)

// Login
router.route('/login').post(usersController.login)

// Get all users
router.route('/').get(usersController.getAllUsers)

module.exports = router
