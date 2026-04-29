const { exec } = require("child_process")

function speak(text) {
  exec(`termux-tts-speak "${text.replace(/"/g, '')}"`);
}

module.exports = speak