const {exec} = require('child_process')

function playAudio(filePath) {
  exec(`termux-media-player play ${filePath}`);
}

module.exports = playAudio