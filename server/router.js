const express = require('express');
const router = express.Router();
const getMapScript = require('./maps');

router.get('/map', (req, res) => {
  getMapScript(res);
});

module.exports = router;