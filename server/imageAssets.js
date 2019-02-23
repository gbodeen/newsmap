const fs = require('fs');
require('dotenv').config();
const imagePath = process.env.IMAGE_PATH;
const http = require('http');

const clearOldImages = (path = imagePath) => new Promise((resolve, reject) => {
  // clearOldImages is required to return a promise so that it completes 
  // before saveImages writes any new ones; alternatively, it could acquire
  // its file list and then delete only those, while saveImages writes any new images
  // in whatever order it gets them. (But what if the images have the same name? Oh,
  // give the file a random name and add that to the story.)
  fs.readdir(path, (err, files) => {
    if (err) {
      console.log(`Failed to read ${path}.`);
      reject(err);
    } else {
      files.forEach(file => fs.unlink(path + '/' + file, (delErr) => {
        if (delErr) console.log(`Error deleting ${file}.`);
      }));
      resolve('Deleting files now.');
    }
  });
});

const saveImages = (articles, path = imagePath) => {
  clearOldImages();
  console.log(articles);
  return Promise.all(articles.map(article => new Promise((resolve, reject) => {
    console.log('this ran');
    // find image URL
    let url = article.urlToImage;
    let extension = url.match(/\.\w{3,4}$/g)[0];
    // download image && save to file with random name 
    const filename = Math.random().toString().slice(2) + extension;
    const file = fs.createWriteStream(path + '/' + filename);
    const request = http.get(url, res => {
      res.pipe(file);
      file.on('finish', () => file.close()) // might need cb
    })
      .on('error', err => { // Handle errors
        fs.unlink(path + '/' + filename); // Delete the file async. (But we don't check the result)
        console.log(`Error ${err} writing ${file} for ${url}.`);
        reject('Failed to write file.');
      });
    resolve();
    // attach filename to article
    // resolve if success
    // reject if failure at any step
  })));
}

let test = { urlToImage: 'http://localhost:3000/images/blackpointer.png' };
saveImages([test]);

module.exports = saveImages;