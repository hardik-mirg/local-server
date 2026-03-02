const express = require('express');
const router = express.Router();

const usersDb = require('../db');

router.get('/', (req, res) => {
    res.send('router /')
})


async function addUser() {
  const user = await usersDb.insert({ name: 'Alice', age: 25 });
  console.log('Inserted:', user);
}
async function getUsers() {
  const allUsers = await usersDb.find({});
  console.log(allUsers);

  const olderUsers = await usersDb.find({ age: { $gt: 26 } });
  console.log(olderUsers);
}


async function updateUser() {
  await usersDb.update(
    { name: 'Alice' },
    { $inc: { age: 1 } }
  );
  console.log('Alice age incremented');
}

async function removeUser() {
  await usersDb.remove({ name: 'Bob' });
  console.log('Bob removed');
}

module.exports = router;