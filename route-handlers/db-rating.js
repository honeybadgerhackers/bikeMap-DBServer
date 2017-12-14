const express = require('express');
const knex = require('../db.js');

const path = 'rating';

const app = express();

app.use(express.json());

app.get(`/${path}`, (req, res) => {
  const filter = req.headers.filter ? JSON.parse(req.headers.filter) : {};
  knex(path)
    .where(filter)
    .select()
    .then((results) => {
      res.send(results);
    })
    .catch(err => res.status(400).send({ text: 'Something went wrong!', error: err }));
});

app.post(`/${path}`, (req, res) => {
  const { id_user_account, id_route, rating } = req.body;

  const updateRoute = () => {
    knex(path)
      .where({id_route})
      .select()
      .then((response) => {
        const rating = (response.reduce((prev, current) => {
          return prev + current.rating;
        }, 0) / response.length);
        knex('route')
        .where({id: id_route})
        .update({current_rating: rating})
        .then(() => {
          console.info(`updated rating ${id_route}`);
        })
      })
  }

  knex(path)
    .where({ id_user_account, id_route })
    .update({ rating })
    .then((result) => {
      if (!result) {
        knex(path)
          .insert(req.body)
          .then(() => {
            updateRoute();
            res.send('submitted')});
      } else {
        updateRoute();
        res.send('updated');
      }
    })
    .catch(err => res.status(400).send({ text: 'Something went wrong!', error: err }));
});

app.put(`/${path}`, (req, res) => {
  res.sendStatus(400);
});

app.delete(`/${path}`, (req, res) => {
  if (Object.keys(req.body).length) {
    knex(path)
      .where(req.body)
      .del()
      .then(res.send('Deleted'))
      .catch(err => res.status(400).send({ text: 'Something went wrong!', error: err }));
  }
  res.send('Please specify row');
});

module.exports = app;
