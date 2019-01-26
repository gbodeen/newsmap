import React, { useEffect, useState } from 'react';

const Map = () => {
  const [script, setScript] = useState('Hi');


  const getMap = () => {
    fetch('map')
      .then(response => {
        return response.text();
      })
      .then(text => {
        setScript(text);
        // console.log(text.slice(0, 100));
      })
      .catch(err => console.log('FETCHING ERROR, ', err));
  }

  useEffect(getMap, []);

  return (
    <>
      <h3>put a map here</h3>
      <div id="map">Hi</div>
    </>
  )
}

export default Map;

