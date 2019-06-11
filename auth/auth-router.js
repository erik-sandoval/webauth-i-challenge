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
