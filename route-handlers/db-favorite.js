const express = require('express');
const knex = require('../db.js');
const path = 'favorite';

const app = express();

app.use(express.json());

app.get(`/${path}`, (req, res) => {
  knex(path).select()
    .then(res.send);
});

app.post(`/${path}`, (req, res) => {
  knex(path).insert(req.body)
    .then(res.send);
});

app.put(`/${path}`, (req, res) => {

});

app.delete(`/${path}`, (req, res) => {

});

module.exports = app;
