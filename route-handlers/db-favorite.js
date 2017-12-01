const express = require('express');
const knex = require('../db.js');
const path = 'favorite';

const app = express();

app.use(express.json());

app.get(`/${path}`, (req, res) => {
  const filter = req.headers.filter ? JSON.parse(req.headers.filter) : {};
  knex(path)
    .where(filter)
    .select()
    .then((results) => {
      res.send(results);
    });
});

app.post(`/${path}`, (req, res) => {
  knex(path)
    .insert(req.body)
    .then(() => {
      res.send('Success!');
    });
});

app.put(`/${path}`, (req, res) => {

});

app.delete(`/${path}`, (req, res) => {
  if (Object.keys(req.body).length) {
    knex(path)
      .where(req.body)
      .del()
      .then(res.send('Deleted'));
  }
  res.send('Please specify row');
});

module.exports = app;
