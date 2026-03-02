const express = require('express')
const router = express.Router()
const fs = require('fs');

const execute = require('../../execute')

function parseTermuxInfo(text) {
  const result = {};
  
  // Match each field with regex
  const androidMatch = text.match(/Android version:\s*(.+)/);
  const kernelMatch = text.match(/Kernel build information:\s*(.+)/);
  const manufacturerMatch = text.match(/Device manufacturer:\s*(.+)/);
  const modelMatch = text.match(/Device model:\s*(.+)/);

  result.androidVersion = androidMatch ? androidMatch[1].trim() : null;
  result.kernelBuild = kernelMatch ? kernelMatch[1].trim() : null;
  result.manufacturer = manufacturerMatch ? manufacturerMatch[1].trim() : null;
  result.deviceModel = modelMatch ? modelMatch[1].trim() : null;

  return result;
}

router.get('/', async (req, res) => {

    cachedInfo = fs.readFileSync('./db/cache/serverInfo.cache')
    if (cachedInfo != '') res.json(JSON.parse(cachedInfo))
    else {
      const info = await execute('termux-info').then(data => parseTermuxInfo(data))
      res.json(info)
      fs.writeFileSync('./db/cache/serverInfo.cache', JSON.stringify(info))
    }
})

module.exports = router