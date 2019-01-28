const NewsAPI = require('newsapi');
require('dotenv').config();
const key = process.env.NEWS_API_KEY;
const newsapi = new NewsAPI(key);
const { insertArticles } = require('./controllers');
const { addLocationText, geocodeLocation } = require('./locations');


const getHeadlines = () => {
  const allUSHeadlines = {
    sources: 'associated-press,reuters',
    language: 'en',
    // country: 'us'
  }

  newsapi.v2.topHeadlines(allUSHeadlines)
    .then(response => addLocationText(response.articles))
    .then(articles => geocodeLocation(articles))
    .then(articles => insertArticles(articles))
    .then(success => console.log('Seeded database.'))
    .catch(err => console.log('Error retrieving news stories:  ', err));
}

module.exports = getHeadlines;
