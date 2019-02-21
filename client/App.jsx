import React from 'react';
import Map from './Map.jsx';
import apiKey from './secrets/api.js';

const App = () => (
  <>
    <div className="overlay">NewsMap</div>
    <Map
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%`, width: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  </>
)

export default App;