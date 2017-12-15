const express = require('express');
const knex = require('../db.js');
const googleCalls = require('../utilities/google');
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "honeybadgerhackers",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const path = 'session';

const app = express();

app.use(express.json({ limit: '5mb' }));

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

app.post(`/${path}`, async ({ body }, res) => {

  if (body.tripData) {
    const {
      tripData: {
        id: id_route,
        userId,
      },
      tripStats: {
        speedCounter,
        avgSpeed,
        rating,
        time,
        origin,
        destination,
        wayPoints,
        imageBase64
      },
    } = body;

    let routeImage = "";
    const tripInfo = await googleCalls.getRouteDistance(origin, destination, wayPoints);

    const {
      data: {
        routes: [{
          legs: [{
            distance: { text },

          }],
        }],
      },
    } = tripInfo;
    const distance = Number(text.split(' ')[0]);

    if (imageBase64 !== '') {
      await cloudinary.uploader.upload(`data:image/jpeg;base64,${imageBase64}`, (result) => {
        if (result.error) {
          // eslint-disable-next-line
          console.error(JSON.stringify(result.error));
          routeImage = null;
        } else {
          routeImage = result.secure_url;
        }
      });
    }


    const session = {
      id_user_account: userId,
      mph: avgSpeed,
      id_route,
      distance,
      time,
      photo_url: routeImage,
    };

    knex(path)
      .insert(session)
      .returning('*')
      .then(([newSession]) => {
        res.send(newSession);
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
