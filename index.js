require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors({
    origin: '*', // Allow any origin (React app, phone, laptop)
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())


const { WebSocketServer} = require('ws')
const wss = new WebSocketServer({port: process.env.WSS_PORT})
app.set('esp32', null)

wss.on('connection', (ws) => {
    esp32socket = ws
    app.set('esp32', ws);
    console.log('ESP32 Connected!')
    
    ws.on('close', () => {
        esp32socket = null
        app.set('esp32', null);
        console.log('ESP32 Disconnected!')})
})


// Routes
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const serverRoute = require('./routes/server')
const musicRoute = require('./routes/music')
const cameraRoute = require('./routes/cctv')
const iotRoute = require('./routes/iot')

// Middlewares
const checkAuth = require('./middlewares/checkAuth')


app.get('/', (req, res) => {
    console.log(req.ip)
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
app.use('/server',serverRoute)
app.use('/music', musicRoute)
app.use('/cctv', cameraRoute)
app.use('/iot', iotRoute)


app.listen(process.env.PORT, '0.0.0.0' ,() => console.log(`Backend Server listening at Port: ${process.env.PORT} || IoT WebSocketServer listening on port ${process.env.WSS_PORT}`))
