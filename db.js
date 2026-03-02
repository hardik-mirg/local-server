// db.js
const Datastore = require('nedb-promises');

// Create/load the database file
const usersDb = Datastore.create({ filename: 'db/users.db', autoload: true });

module.exports = usersDb;