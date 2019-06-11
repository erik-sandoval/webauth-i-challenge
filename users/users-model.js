const db = require('../database/dbconfig');

module.exports = {
  findBy,
  find
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(column) {
  return db('users').where(column);
}


