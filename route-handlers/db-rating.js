const express = require('express');
const knex = require('../db.js');

const path = 'rating';

const app = express();

app.use(express.json());

app.get(`/${path}`, (req, res) => {
  const filter = req.headers.filter ? JSON.parse(req.headers.filter) : {};
  knex(path).where(filter).select()
    .then((results) => {
      res.send(results);
    });
});

app.post(`/${path}`, (req, res) => {
  const { id_user_account, id_route, rating } = req.body;

  knex(path)
    .where({ id_user_account, id_route })
    .update({ rating })
    .then((result) => {
      if (!result) {
        knex(path)
          .insert(req.body)
          .then(res.send('submitted'));
      } else {
        res.send('updated');
      }
    });
});

app.put(`/${path}`, (req, res) => {

});

app.delete(`/${path}`, (req, res) => {

});

module.exports = app;
