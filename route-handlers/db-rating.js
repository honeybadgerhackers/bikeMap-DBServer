const express = require('express');
const knex = require('../db.js');
const path = 'rating';

const app = express();

app.use(express.json());

app.get(`/${path}`, (req, res) => {
    knex(path).select()
    .then(console.log)
});

app.post(`/${path}`, (req, res) => {

});

app.put(`/${path}`, (req, res) => {

});

app.delete(`/${path}`, (req, res) => {

});

module.exports = app;
