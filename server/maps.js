require('dotenv').config();
const API_KEY = process.env.API_KEY;
const axios = require('axios');

const getMapScript = (res) => {
  const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;

  axios.get(url)
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(500).send('Error retrieving maps data.');
    });
}

module.exports = getMapScript;