const express = require('express');
const knex = require('../db.js');
const googleCalls = require('../utilities/google');

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

app.get(`/${path}nearby`, (req, res) => {
  const filter = req.headers.filter ? JSON.parse(req.headers.filter) : {lat: 29.9459695, lng: -90.07005989999999};
  if (!filter.distance) {
    filter.distance = 0.07
  };
  const {lat, lng, distance} = filter;
  knex('waypoint')
    .select()
    .where(function() {
      this.where({count: 0})
      .whereBetween('lat', [lat - distance, lat + distance])
      .andWhereBetween('lng', [lng - distance, lng + distance])
    })
    .orWhere(function() {
        this.whereNot({count: 0})
        .andWhereNot({street: null})
        .whereBetween('lat', [lat - distance, lat + distance])
        .andWhereBetween('lng', [lng - distance, lng + distance])
    })
    .join('route', 'route.id', '=', 'waypoint.id_route')
    .then((results) => {
      res.send(results);
    })
    .catch(err => res.status(400).send({ text: 'Something went wrong!', error: err }));
});

app.post(`/${path}`, async ({ body }, res) => {
  if (body.waypoints) {
    const { waypoints, userId } = body;
    const first = waypoints[0];
    const last = waypoints[waypoints.length - 1];

    const { data: { results: [firstAddress] } } = await googleCalls.reverseGeocode(`${first.lat},${first.lng}`);

    const [firstStreet] = firstAddress.address_components.filter((component) => {
      if (component.types.indexOf('route') > -1) {
        return true;
      }
      return false;
    });

    const { data: { results: [lastAddress] } } = await googleCalls.reverseGeocode(`${last.lat},${last.lng}`);

    const [lastStreet] = lastAddress.address_components.filter((component) => {
      if (component.types.indexOf('route') > -1) {
        return true;
      }
      return false;
    });

    waypoints[0].street = firstStreet.short_name;
    waypoints[waypoints.length - 1].street = lastStreet.short_name;

    const route = {
      route_name: `${firstStreet.short_name} to ${lastStreet.short_name}`,
      id_user_account: userId,
      type: null,
      favorite_count: 0,
      current_rating: 0,
    };

    knex(path)
      .insert(route)
      .returning('id')
      .then(([id]) => {
        const mappedWaypoints = waypoints.map(({ lat, lng, street = null }, count) => (
          {
            id_route: id,
            lat,
            lng,
            count,
            street,
          }
        ));
        knex('waypoint')
          .insert(mappedWaypoints)
          // .returning('*')
          .then((result) => {
            res.send({ type: 'Success!', result, routeId: id });
          })
          .catch(err => res.status(400).send({ text: 'Something went wrong!', error: err }));
      });
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
