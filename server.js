require('dotenv').config()
const express = require('express');
const db = require('./db')
const paths = require('./route-handlers')

const app = express();

Object.values(paths).forEach((path) => {
  app.use(path);
});

app.listen(process.env.PORT, () => {
  console.info(`Listening on port ${process.env.PORT}`);
});
