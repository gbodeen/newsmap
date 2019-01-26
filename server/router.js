const express = require('express');
const router = express.Router();
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const http = require('http');
const fs = require('fs');


// the goal is to only expose the key on the server - this route doesn't work yet
router.get('/map', (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
  const file = fs.createWriteStream("assets/map_script.js");
  const request = http.get(url, res => response.pipe(file));
});