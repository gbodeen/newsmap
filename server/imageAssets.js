const fs = require('fs');
require('dotenv').config();
const imagePath = process.env.IMAGE_PATH;

const clearOldImages = () => new Promise((resolve, reject) => {
  fs.readdir(imagePath, (err, files) => {
    if (err) {
      console.log(`Failed to read ${imagePath}.`);
      reject(err);
    } else {
      Promise.all(files.map(file =>
        new Promise((resolve, reject) => {
          fs.unlink(imagePath + '/' + file, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        })
      ))
        .then(success => resolve(success))
        .catch(err => reject(err));
    }
  });
});

const saveImages = async (articles) => {
  await clearOldImages();

}

clearOldImages();

module.exports = saveImages;