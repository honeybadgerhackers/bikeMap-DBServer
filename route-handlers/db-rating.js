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

    // knex.transaction(trx => {
    //     trx(path).where('username', name).then(res => {
    //       if (res.length === 0) {
    //         return trx('users').insert({ username: name }).then(() => {
    //           return trx('users').where('username', name);
    //         });
    //       } else {
    //         return res;
    //       }
    //     });
    //   }).then(res => console.log(`User is: ${res[0]}`));
    
});

app.put(`/${path}`, (req, res) => {

});

app.delete(`/${path}`, (req, res) => {

});

module.exports = app;