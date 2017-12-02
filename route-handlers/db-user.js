const express = require('express');
const knex = require('../db.js');
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
    });
});

app.post(`/${path}`, (req, res) => {
  console.log(req.body);
  const {
    first_name,
    last_name,
    picture,
    email,
    social_media_id,
    social_media_token,
  } = req.body;

//   knex.raw(`SELECT DATA_TYPE 
// FROM INFORMATION_SCHEMA.COLUMNS 
// WHERE table_name = 'user_account' 
// AND COLUMN_NAME = 'id'`).then(result => console.log(result));

  // knex.raw(`ALTER TABLE user_account ADD CONSTRAINT emailunique UNIQUE (email)`).then(result => console.log(result));

  knex.raw(`insert into user_account ( first_name, last_name, picture, email, social_media_id, social_media_token )
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
    }
  ).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.error(err);
  });


  // knex(path)
  //   .where(req.body)
  //   .then((result) => {
  //     if (result.length === 0) {
  //       knex(path)
  //         .insert(req.body)
  //         .then(() => {
  //           knex(path).where(req.body).then((result) => {
  //             res.send(result);
  //           })
  //         })
  //     } else {
  //       res.send(result);
  //     }
  //   });
  res.send(200);
});

app.put(`/${path}`, (req, res) => {

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
