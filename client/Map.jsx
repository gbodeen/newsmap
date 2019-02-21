import React, { useEffect, useState } from 'react';
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import apiKey from './secrets/api.js';


const Map = withScriptjs(withGoogleMap((props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     news: []
  //   }
  // }
  const [news, setNews] = useState([]);

  // componentDidMount() {
  //   this.getNews();
  // }

  const getNews = () => {
    fetch('news')
      .then(response => response.json())
      .then(news => setNews(news));
  }

  useEffect(getNews, []);

  const onMarkerClick = (url) => {
    window.open(url);
  }

  return (
    <GoogleMap
      defaultZoom={5}
      center={{ lat: 38.00000, lng: -96.00000 }}
    >

      {news.map(story => {
        return (
          <Marker
            title={story.description}
            name={story.title}
            position={story.geocode}
            onClick={() => onMarkerClick(story.url)}
            class="customMarker"
            key={Math.random()}
            icon={{
              url: story.urlToImage,
              anchor: new google.maps.Point(24, 24),
              scaledSize: new google.maps.Size(48, 48)
            }}
          />
        )
      })}
    </GoogleMap>
  )
}))

export default Map;
