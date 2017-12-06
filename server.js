require('dotenv').config();
const express = require('express');
// const db = require('./db');
const paths = require('./route-handlers');
const jwt = require('./auth/route-protector');

const app = express();

app.use(jwt.check, jwt.requireScope('full_access'));
app.use(express.json());

Object.values(paths).forEach((path) => {
  app.use(path);
});

app.listen(process.env.PORT, () => {
  console.info(`Listening on port ${process.env.PORT}`);
});
