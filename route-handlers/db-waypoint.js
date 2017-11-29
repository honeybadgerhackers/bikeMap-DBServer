const express = require('express');
const knex = require('../db.js');
const path = 'waypoint';

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
    
});

app.put(`/${path}`, (req, res) => {

});

app.delete(`/${path}`, (req, res) => {

});

module.exports = app;
