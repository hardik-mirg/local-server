const express = require('express')
const router = express.Router();

const askLLM = require('../scripts/askLLM')
const IoTRAG = require('../scripts/IoTRAG')
const tts = require('../scripts/tts')
const playAudio = require('../scripts/playAudio')

router.get('/toggle/:state', (req, res) => {
    const esp32Socket = req.app.get('esp32')
    const state = req.params.state; // '1' for ON, '0' for OFF
    if (esp32Socket) {
        esp32Socket.send(state);
        return res.send(`Sent ${state} to ESP32`);
    }
    res.status(500).send('ESP32 not connected');
});

router.post('/command', async (req, res) => {
    res.status(200).send('ok')
    
    const esp32Socket = req.app.get('esp32')
    try {
        let cmd = req.body.command[0].toLowerCase()
        
        if (cmd.startsWith('hey server')) {
            
            playAudio('~/home-server/assets/ai_voice_start.mp3')
            if (cmd.includes('on') && cmd.includes('light')){
                tts('lights turned on')
                esp32Socket.send(1)
            }
            else if (cmd.includes('off') && cmd.includes('light')) {
                tts('lights turned off')
                esp32Socket.send(0)
            }
            else {
                const prompt = `Respond in ONE of these formats:

{"action":"lights on"}
{"tool":"getWeather","arg":"mumbai"}
hello

Rules:
- Output EXACTLY one format
- JSON must be complete and valid
- No extra text
- If unsure, reply in plain text
- If tool result is present, DO NOT use tools. Reply in plain text.

Actions: lights on, lights off, fan on, fan off
Tools: getDateTime, getCity, getWeather

Examples:
turn on lights → {"action":"lights on"}
weather in mumbai → {"tool":"getWeather","arg":"mumbai"}
Tool result: Mumbai: ☀️ +32°C → It's 32°C and sunny in Mumbai
hello → hi

user: ${cmd.slice(11)} →`
                const LLM_Res = await IoTRAG(prompt)
                playAudio('~/home-server/assets/ding.mp3')
                tts(LLM_Res)
                console.log(LLM_Res)
                if (LLM_Res.startsWith('{')) {
                    try {
                        const action = JSON.parse(LLM_Res).action
                        if (action == "lights on") esp32Socket.send(1);
                        if (action == "lights off") esp32Socket.send(0);
                        
                    } catch (error) {
                    }
                }
            }
                
        }
    } catch (error) {

    }

})

module.exports = router;