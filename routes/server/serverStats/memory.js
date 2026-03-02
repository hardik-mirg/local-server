const express = require('express')
const router = express.Router()

const exec = require('../../../execute')

const command = `
free -b | awk '
$1=="Mem:" {
print "{"
print "  \\"memory\\": {"
print "    \\"total_bytes\\": " $2 ","
print "    \\"used_bytes\\": " $3 ","
print "    \\"free_bytes\\": " $4 ","
print "    \\"shared_bytes\\": " $5 ","
print "    \\"buffer_cache_bytes\\": " $6 ","
print "    \\"available_bytes\\": " $7
print "  },"
}
$1=="Swap:" {
print "  \\"swap\\": {"
print "    \\"total_bytes\\": " $2 ","
print "    \\"used_bytes\\": " $3 ","
print "    \\"free_bytes\\": " $4
print "  }"
print "}"
}'
`;

router.get('/', async (req, res) => {
    const memory = await exec(command)

res.json(JSON.parse(memory))
})

module.exports = router