const usersDb = require('../db')

const checkAuth = async (req, res, next) => {
    try {
        const {username, id} = req.headers.authorization
    } catch (error) {
        return res.status(401).json({message: "Authorization Required"})
    }


    const user = await usersDb.findOne(username, id)


    if (!user) return res.status(401).json({error: "Access Denied"})
    next()
}

module.exports = checkAuth