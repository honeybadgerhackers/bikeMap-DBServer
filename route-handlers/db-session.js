const express = require('express');
const knex = require('../db.js');

const path = 'session';

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

app.post(`/${path}`, ({ body }, res) => {
  if (body.tripData) {
    const {
      tripData: {
        userId,
        routeId,
        distance,
        time,
      },
      tripStats: {
        avgSpeed,
        rating,
        speedCounter,
      },
    } = body;

    const session = {
      id_route: routeId,
      id_user_account: userId,
      mph: avgSpeed,
      distance,
      time,
    };
    console.log(session)

  //   knex(path)
  //     .insert(session)
  //     .returning('id')
  //     .then(([id]) => {
  //       res.send(id);
  //     });
  } else {
    res.sendStatus(403);
  }
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
