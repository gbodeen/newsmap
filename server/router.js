const express = require('express');
const router = express.Router();
const { retrieveArticles } = require('../db/controllers');

router.get('/news', (req, res) => {
  retrieveArticles()
    .then(articles => {
      console.log('Retrieved articles from database to send to client');
      res.status(200).json(articles);
    })
    .catch(err => {
      console.log('Error retrieving articles from database to send to client');
      res.status(500).send('Could not retrieve news articles.');
    })
})

module.exports = router;