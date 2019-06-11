const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

module.exports = function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'invalid credentials' });
        }
      })
      .catch(err => {
        res.status(500).json({ err });
      });
  } else {
    res.status(400).json({ message: 'please provide credentials' });
  }
};
