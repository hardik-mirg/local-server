const express = require('express')
const router = express.Router()
const fs = require('fs');

const execute = require('../../execute')

router.get('/', async (req, res) => {

    const cachedInfo = fs.readFileSync('./db/cache/serverSensors.cache')

    if (cachedInfo != '') res.json(JSON.parse(cachedInfo))
    else {
        const sensorList = await execute('termux-sensor -l')
        res.json(JSON.parse(sensorList))
        fs.writeFileSync('./db/cache/serverSensors.cache', sensorList)
    }
    
})

module.exports = router