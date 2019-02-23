const fs = require('fs');
require('dotenv').config();
const imagePath = process.env.IMAGE_PATH;

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

const saveImages = async (articles) => {
  await clearOldImages();
}

clearOldImages();

module.exports = saveImages;