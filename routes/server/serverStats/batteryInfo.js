const express = require('express')
const router = express.Router()

const execute = require('../../../scripts/execute')

router.get('/', async (req, res) => {

    const battery = await execute('termux-battery-status')

    res.json(JSON.parse(battery))
})

module.exports = router