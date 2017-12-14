const express = require('express');
const knex = require('../db.js');
const jwt = require('../auth/jwt');

const path = 'user_account';

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
  const {
    first_name,
    last_name,
    picture,
    email,
    social_media_id,
    social_media_token,
  } = req.body;
  // eslint-disable-next-line
  if (social_media_id) {
    knex.raw(
      `insert into user_account ( first_name, last_name, picture, email, social_media_id, social_media_token )
      values ( :first_name, :last_name, :picture, :email, :social_media_id, :social_media_token )
      on conflict ( social_media_id ) do update
      SET social_media_token = :social_media_token
      returning *`,
      {
        first_name,
        last_name,
        picture,
        email,
        social_media_id,
        social_media_token,
      }).then(({ rows: [user] }) => {
      res.send({
        id_token: jwt.createIdToken(user),
        access_token: jwt.createAccessToken(),
        type: 'success!',
      });
    }).catch((err) => {
      // eslint-disable-next-line
      console.log(err);
      res.status(409).send(err);
    });
  } else {
    res.status(400).send('Invalid social media id!');
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
