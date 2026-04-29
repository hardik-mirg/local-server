const express = require('express')
const router = express.Router()

const libraryRoute = require('./music/library')

router.use('/library', libraryRoute)

module.exports = router