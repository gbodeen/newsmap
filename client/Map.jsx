import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import apiKey from './secrets/api.js';


export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    }
  }

  mapStyle = {
    width: '100%',
    height: '100%'
  };

  componentDidMount() {
    this.getNews();
  }

  getNews = () => {
    fetch('news')
      .then(response => response.json())
      .then(news => this.setState({ news }));
  }

  render() {
    return (
      <Map
        google={this.props.google}
        style={this.mapStyle}
        initialCenter={{
          lat: 38.00000,
          lng: -96.00000
        }}
        zoom={5}
      />
    )
  }
}

// export default MapContainer;

const MapWrap = GoogleApiWrapper({ apiKey })(MapContainer);
export default MapWrap;

// export default GoogleApiWrapper({ apiKey })(MapContainer);

