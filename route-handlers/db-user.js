const express = require('express');
const knex = require('../db.js');
const path = 'user_account';

const app = express();

app.use(express.json());

app.get(`/${path}`, (req, res) => {
    knex(path).select()
    .then(res.send)
});

app.post(`/${path}`, (req, res) => {

});

app.put(`/${path}`, (req, res) => {

});

app.delete(`/${path}`, (req, res) => {

});

module.exports = app;
