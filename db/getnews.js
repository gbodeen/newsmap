const NewsAPI = require('newsapi');
require('dotenv').config();
const key = process.env.NEWS_API_KEY;
const newsapi = new NewsAPI(key);
const { insertArticles } = require('./controllers');
const { addLocationText, geocodeLocation } = require('./locations');
const PAGESIZE = 100;
const saveImages = require('../server/imageAssets');

const getHeadlines = (page = 1) => {
  const allUSHeadlines = {
    sources: 'associated-press,reuters',
    language: 'en',
    pageSize: PAGESIZE,
    page: page
  }

  newsapi.v2.everything(allUSHeadlines)
    .then(response => {
      if (response.totalResults > page * PAGESIZE && page <= 5) {
        getHeadlines(page + 1);
      }
      // console.log('Number of results: ', response.totalResults);
      return addLocationText(response.articles)
    })
    .then(articles => {
      saveImages(articles);
      return geocodeLocation(articles)
    }
    )
    .then(articles => insertArticles(articles))
    .then(success => console.log('Seeded database.'))
    .catch(err => console.log('Error retrieving news stories:  ', err));
}

module.exports = getHeadlines;
