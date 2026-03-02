const express = require('express')
const router = express.Router()

const exec = require('../../../execute')


const command = `
df /data /sdcard | awk '
NR==1 { next }   # skip header
{
  mount = $6

  # Skip FUSE mirror of internal storage
  if (mount == "/storage/emulated") next

  total_kb = $2
  used_kb  = $3
  avail_kb = $4

  usep = $5
  sub(/%/, "", usep)

  print "{"
  print "  \\"storage\\": {"
  print "    \\"mount\\": \\"" mount "\\","
  print "    \\"total_bytes\\": " total_kb * 1024 ","
  print "    \\"used_bytes\\": " used_kb * 1024 ","
  print "    \\"available_bytes\\": " avail_kb * 1024 ","
  print "    \\"use_percent\\": " usep
  print "  }"
  print "}"
}'
`;

router.get('/', async (req, res) => {
    const storage = await exec(command)
res.json(JSON.parse(storage))
})

module.exports = router