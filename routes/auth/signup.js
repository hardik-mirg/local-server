const express = require('express')
const router = express.Router()

const usersDb = require('../../db')

router.post('/', async (req, res) => {
    const {username, name, password} = req.body

    if (!username || !name || !password) return res.status(400).json({error: "all fields are required"})
 
    try {
        
        const user = await usersDb.findOne({username})
    if(user) return res.status(409).json({error: "username already taken"})
    const newUser = await usersDb.insert({username, name, password})
    return res.status(201).json({message: "new user created successfully", user: newUser})

    } catch (err) {
        return res.status(500).json({error: "internal server error", err})
    }
    


})

module.exports = router