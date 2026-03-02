const express = require('express')
const router = express.Router()

const infoRoute = require('./server/serverInfo')
const sensorsRoute = require('./server/serverSensors')
const statsRoute = require('./server/serverStats')

router.use('/info', infoRoute)
router.use('/sensors', sensorsRoute)
router.use('/stats', statsRoute)
module.exports = router