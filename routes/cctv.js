const express = require('express');
const router = express.Router();
const http = require('http')

IP_WEBCAM = 'http://localhost:4000'

// router.get('/camera', (req, res) => {
//   http.get(`${IP_WEBCAM}/video`, (camRes) => {
//     res.setHeader('Content-Type', camRes.headers['content-type']);
//     camRes.pipe(res);
//   });
// });

// router.get('/audio', (req, res) => {
//   http.get(`${IP_WEBCAM}/audio.wav`, (camRes) => {
//     res.setHeader('Content-Type', camRes.headers['content-type']);
//     camRes.pipe(res);
//   });
// });

router.get('/camera', (req, res) => {
  res.send('currently gooning, come back later')
})



module.exports = router;