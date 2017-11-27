require('dotenv').config()
const express = require('express');
const db = require('./db')
const user = require('./route-handlers/db-user')
const route = require('./route-handlers/db-route')
const rating = require('./route-handlers/db-rating')
const session = require('./route-handlers/db-session')
const favorite = require('./route-handlers/db-favorite')
const waypoint = require('./route-handlers/db-waypoint')

const app = express();

app.use(user);
app.use(route);
app.use(rating);
app.use(session);
app.use(favorite);
app.use(waypoint);



app.listen(3000, () => {
    console.info(`Listening on port ${process.env.PORT}`);
})
