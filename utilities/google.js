const axios = require('axios');

const { GOOGLE_API_KEY } = process.env;

module.exports = {
  reverseGeocode: coords => (
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?' +
      `latlng=${coords}` +
      `&key=${GOOGLE_API_KEY}`)
      .then(result => result)
      .catch(err => console.log(err))
  ),
  getRouteDistance: (origin, destination, wayPoints) => (
    axios.get('https://maps.googleapis.com/maps/api/directions/json?' +
      '&mode=walking' +
      `&origin=${origin}` +
      `&destination=${destination}` +
      `&waypoints=via:enc:${wayPoints}:` +
      `&key=${GOOGLE_API_KEY}`)
      .then(result => result)
      .catch(err => console.log(err))
  ),
  getRouteImage: coords => (
    axios.get('https://maps.googleapis.com/maps/api/staticmap?' +
      'size=600x600' +
      `&path=weight:4|color:red|enc:${coords}` +
      `&key=${GOOGLE_API_KEY}`)
      .then(result => result)
      .catch(err => console.log(err))
  ),
};
