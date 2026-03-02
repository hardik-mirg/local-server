const {exec} = require('child_process')

function execute(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { shell: "/bin/bash" }, (error, stdout, stderr) => {
      if (error) return reject(stderr || error.message);
      resolve(stdout.trim());
    });
  });
}

module.exports = execute