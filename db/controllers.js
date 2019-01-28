const Article = require('./schema');

insertArticles = articles => {
  return Article.insertMany(articles)
    // .then(dbResult => console.log(dbResult))
    .catch(err => console.log('Error inserting articles into database:  ', err));
}

retrieveArticles = () => {
  return Article.find({})
    .catch(err => console.log('Error retrieving articles from database:  ', err));
}

module.exports = {
  insertArticles,
  retrieveArticles
}