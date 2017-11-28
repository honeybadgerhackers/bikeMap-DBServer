const express = require('express');
const knex = require('../db.js');

const path = 'rating';

const app = express();

app.use(express.json());

app.get(`/${path}`, (req, res) => {
  knex(path).select()
    .then(res.send);
});

app.post(`/${path}`, (req, res) => {
  const { id_user_account, id_route, rating } = req.body;
  knex.raw(
    'update rating set rating = :rating where id_user_account = :id_user_account and id_route = :id_route',
    { id_user_account, id_route, rating },
  )
    .then((result) => {
      if (!result.rowCount) {
        knex('rating').insert(req.body)
          .then(res.send('updated rating'));
      }
      res.send('submitted rating');
    });
});

app.put(`/${path}`, (req, res) => {

});

app.delete(`/${path}`, (req, res) => {

});

module.exports = app;
