const express = require('express');
const knex = require('../db.js');

const path = 'route';

const app = express();

app.use(express.json());

/* eslint-disable no-param-reassign */
app.get(`/${path}&location`, (req, res) => {
  const filter = req.headers.filter ? JSON.parse(req.headers.filter) : {};
  knex(path)
    .where(filter)
    .join('waypoint', 'route.id', '=', 'waypoint.id_route')
    .select(
      'route.id', 'route.route_name', 'route.type', 'route.current_rating',
      'route.favorite_count', 'waypoint.lat', 'waypoint.lng', 'waypoint.count',
    )
    .then((results) => {
      const waypoints = results.map(result => ({
        lat: result.lat,
        lng: result.lng,
        count: result.count,
      }));
      delete results[0].lat;
      delete results[0].lng;
      results[0].waypoints = waypoints;
      const mergedRoute = results[0];
      res.send(mergedRoute);
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.log(error);
    });
});

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
  knex(path)
    .insert(req.body)
    .then(() => {
      res.send('Success!');
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
