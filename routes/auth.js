const express = require('express')
const router = express.Router()

const loginRoute = require('./auth/login')
const signUpRoute = require('./auth/signup')

router.use('/login', loginRoute)
router.use('/signup', signUpRoute)

module.exports = router