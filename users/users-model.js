const db = require('../database/dbconfig');

module.exports = {
  findBy,
  find,
  add,
  findById
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(column) {
  return db('users').where(column);
}

function add(account) {
  return db('users')
    .insert(account, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}
