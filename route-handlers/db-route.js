const express = require('express');
const knex = require('../db.js');

const path = 'route';

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

app.get(`/${path}&location`, (req, res) => {
  const filter = req.headers.filter ? JSON.parse(req.headers.filter) : {};
  knex(path)
    .where(filter)
    .join('waypoint', 'route.id', '=', 'waypoint.id_route')
    .select('route.id', 'route.route_name', 'route.type', 'route.current_rating', 
            'route.favorite_count', 'waypoint.lat', 'waypoint.lng', 'waypoint.count')
    .then((results) => {
      let waypoints = results.map(result => {
        return {lat: result.lat, lng: result.lng, count: result.count}
      });
      delete results[0].lat;
      delete results[0].lng;
      results[0].waypoints = waypoints;
      let mergedRoute = results[0];
      res.send(mergedRoute);
    }).catch((error) => {
      console.log(error);
    })      
}); 

app.post(`/${path}`, (req, res) => {
  knex(path)
    .insert(req.body)
    .then(() => {
      res.send('Success!');
    });
});

app.put(`/${path}`, (req, res) => {
  res.sendStatus(400);
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
