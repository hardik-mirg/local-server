const express = require('express')
const router = express.Router()

const usersDb = require('../../db')

router.post('/', async (req, res) => {
    const {username, password} = req.body

    if (!username || !password) return res.status(400).json({error: "all fields are required"})
    
    try {
        const user = await usersDb.findOne({username, password})
        if (user) return res.status(200).json({message: "user authorized", user: {username: user.username, name:user.name}})
        
        return res.status(401).json({error: "username or password incorrect"})
    } catch (err) {
         res.status(500).json({error: "internal server error", err})
    }

})

module.exports = router