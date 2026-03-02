const express = require('express')
const router = express.Router()

const batteryRoute = require('./serverStats/batteryInfo')
const memoryRoute = require('./serverStats/memory')
const storageRoute = require('./serverStats/storage')
const cpuRoute = require('./serverStats/cpu')

router.use('/battery', batteryRoute)
router.use('/memory', memoryRoute)
router.use('/storage', storageRoute)
router.use('/cpu', cpuRoute)

module.exports = router