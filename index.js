require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json())

const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const serverRoute = require('./routes/server')

app.get('/', (req, res) => {
    res.send(`
        
        <html>
        <body>
        <a href='/server/info'>Server (phone) model info</a></br>
        <a href='/server/sensors'>list of sensors present in server (phone)</a></br>
        <a href='/server/stats/battery'>Server Battery Status</a></br>
        <a href='/server/stats/memory'>Server Memory Status</a></br>
        <a href='/server/stats/storage'>Server Storage Status</a></br>
        <a href='/server/stats/cpu'>Server CPU usage</a></br>

        </body>
        </html>
        `)
})

app.use('/user', userRoute)
app.use('/auth', authRoute)
app.use('/server', serverRoute)

app.listen(process.env.PORT, () => console.log(`Backend Server listening at Port: ${process.env.PORT}`))