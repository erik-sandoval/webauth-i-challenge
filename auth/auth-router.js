const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hash;

  Users.add(req.body)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'invalid credentials' });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

router.delete('/', (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
  res.status(200).json({ message: 'successfully logged out' });
});

module.exports = router;
