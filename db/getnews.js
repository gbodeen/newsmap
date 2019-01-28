const NewsAPI = require('newsapi');
require('dotenv').config();
const key = process.env.NEWS_API_KEY;
const newsapi = new NewsAPI(key);
const { insertArticles } = require('./controllers');


const getHeadlines = () => {
  const allUSHeadlines = {
    language: 'en',
    country: 'us'
  }

  newsapi.v2.topHeadlines(allUSHeadlines)
    .then(response => {
      // console.log('Response from News API:  ', response);
      return insertArticles(response.articles);
    })
    .catch(err => console.log('Err retrieving news stories:  ', err));
}

module.exports = getHeadlines;
