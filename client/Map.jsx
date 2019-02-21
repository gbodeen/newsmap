import React, { useEffect, useState } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, OverlayView, Marker } from "react-google-maps"
import CustomMarker from './Marker.jsx';


const Map = withScriptjs(withGoogleMap((props) => {
  const [news, setNews] = useState([]);

  const getNews = () => {
    fetch('news')
      .then(response => response.json())
      .then(news => setNews(news));
  }

  useEffect(getNews, []);

  return (
    <GoogleMap
      defaultZoom={5}
      center={{ lat: 38.00000, lng: -96.00000 }}
    >
      {news.map(story => {
        return <CustomMarker story={story} key={Math.random()} />;
      })}
    </GoogleMap>
  )
}))

export default Map;
