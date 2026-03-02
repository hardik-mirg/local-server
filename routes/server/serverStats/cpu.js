const express = require('express')
const router = express.Router()

const exec = require('../../../execute')

const command = `
uptime | awk '
{
  split($0, a, "load average: ");
  split(a[2], l, ", ");

  up = $0;
  sub(/^.* up /, "", up);
  sub(/, *load average:.*$/, "", up);

  printf "{\\n";
  printf "  \\"system\\": {\\n";
  printf "    \\"uptime\\": \\"%s\\",\\n", up;
  printf "    \\"loadavg\\": {\\n";
  printf "      \\"1m\\": %s,\\n", l[1];
  printf "      \\"5m\\": %s,\\n", l[2];
  printf "      \\"15m\\": %s\\n", l[3];
  printf "    }\\n";
  printf "  }\\n";
  printf "}\\n";
}'
`;

router.get('/', async (req, res) => {
    let cpuData = await exec(command).then(data => JSON.parse(data))
    const cores = await exec('nproc')
    cpuData.system.cores = cores;
    cpuData.system.loadavg_per_core = {
        "1m": cpuData.system.loadavg["1m"] / cores,
        "5m": cpuData.system.loadavg["5m"] / cores,
        "15m": cpuData.system.loadavg["15m"] / cores
    }
    
    res.json(cpuData)
});


module.exports = router