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
    .join('route', 'route.id', '=', 'favorite.id_route')
    .then((results) => {
      res.send(results);
    })
    .catch(err => res.status(400).send({ text: 'Something went wrong!', error: err }));
});

const updateRoute = (id_user_account, id_route, increment) => {
  knex('route')
    .where({id: id_route})
    .update({
      favorite_count: knex.raw(`favorite_count ${increment ? '+' : '-'} 1`)
    })
    .then()
};

app.post(`/${path}`, (req, res) => {
  const {id_user_account, id_route} = req.body
  knex(path)
  .where({
    id_user_account,
    id_route
  })
  .first()
  .then((found) => {
     if (!found) {
        knex(path)
          .insert(req.body)
          .then(() => {
            knex(path)
            .where({"favorite.id_user_account": id_user_account})
            .join('route', 'route.id', '=', 'favorite.id_route')
            .then((results) => {
              updateRoute(id_user_account, id_route, true)
              res.send(results);
            })
          })
      } else {
        knex(path)
        .where({"favorite.id_user_account": id_user_account})
        .join('route', 'route.id', '=', 'favorite.id_route')
        .then((results) => {
          res.send(results);
        })
      }
  }).catch(err => res.status(400).send({ text: 'Something went wrong!', error: err }));
});

app.put(`/${path}`, (req, res) => {
  res.sendStatus(400);
});

app.delete(`/${path}`, (req, res) => {
  const {id_user_account, id_route} = req.body
  if (Object.keys(req.body).length) {
    knex(path)
      .where(req.body)
      .del()
      .then(() => {
        knex(path)
        .where({"favorite.id_user_account": id_user_account})
        .join('route', 'route.id', '=', 'favorite.id_route')
        .then((results) => {
          updateRoute(id_user_account, id_route, false)
          res.send(results);
        })
      }).catch(err => res.status(400).send({ text: 'Something went wrong!', error: err }));
    } else {
      knex(path)
      .where({"favorite.id_user_account": id_user_account})
      .join('route', 'route.id', '=', 'favorite.id_route')
      .then((results) => {
        res.send(results);
      }).catch(err => res.status(400).send({ text: 'Something went wrong!', error: err }));
    }
  })

module.exports = app;
