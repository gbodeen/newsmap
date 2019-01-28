const countryDetector = require('country-in-text-detector');
const faker = require('faker');
require('dotenv').config();
const key = process.env.API_KEY;
const googleMapsClient = require('@google/maps').createClient({ key, Promise });

const addLocationText = articles => {
  return articles.map(story => {
    let location;
    try {
      if (story.source.id === 'reuters') {
        location = story.content.split(' (')[0];
      } else if (story.source.id === 'associated-press') {
        location = story.description.split(' (')[0];
      }
      // location = countryDetector.detect(whereLine)[0].matches[0];
      // console.log('Found probably-true location: ', location);
    }
    catch (err) {
      location = faker.address.city() + ', ' + faker.address.state();
      // console.log('Made fake location: ', location);
    }
    story.location = location;
    return story;
  });
}

const geocodeLocation = articles => {
  return Promise.all(articles.map(story => {
    return googleMapsClient.geocode({ address: story.location }).asPromise()
      .then(response => {
        let geocode = response.json.results;
        // console.log('Geocodeded location ', story.location, ' as ', geocode);
        story.geocode = geocode[0].geometry.location;
        return story;
      })
      .catch(err => {
        // console.log('Error geocoding location:  ', story.location, err);
        story.geocode = { lat: faker.address.latitude(), lng: faker.address.longitude() };
        return story;
      });
  }));
}

module.exports = {
  addLocationText,
  geocodeLocation
}