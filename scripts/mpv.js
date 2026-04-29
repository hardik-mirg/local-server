const SOCKET = '/tmp/mpvsocket';
const { exec } = require('child_process')

const execute = (command) => {
  return new Promise((resolve, reject) => {
    const cmd = JSON.stringify({ command });
    exec(`echo '${cmd}' | socat - ${SOCKET}`, (err, stdout) => {
      if (err) return reject(err);
      try { resolve(stdout.trim() ? JSON.parse(stdout.trim()) : { data: 'ok' }); }
      catch { resolve({ data: 'ok' }); }
    });
  });
}

const get = (prop) => { return mpvCmd(['get_property', prop]); }

const isRunning = () => {
  return new Promise(resolve => exec('pgrep -x mpv', (err) => resolve(!err)));
}

module.exports = {execute, get, isRunning}