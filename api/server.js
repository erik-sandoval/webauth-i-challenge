const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const usersRouter = require('../users/users-router');
const authRouter = require('../auth/auth-router');

const server = express();

const sessionConfig = {
  name: 'session',
  secret: 'this is my secret key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 30 * 10
  },
  store: new knexSessionStore({
    knex: require('../database/dbconfig'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 30 * 10
  })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.get('/', (req, res) => {
  res.send({ message: 'I am alive' });
});

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

module.exports = server;
