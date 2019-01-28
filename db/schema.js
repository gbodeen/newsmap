const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/news', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.error.bind(console, 'successfully connected'));

const articleSchema = new mongoose.Schema({
  source: { id: String, name: String },
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  content: String
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;