import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
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

  onMarkerClick = (url) => {
    window.open(url);
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
      >

        {this.state.news.map(story => {
          return (
            <Marker
              title={story.description}
              name={story.title}
              position={story.geocode}
              onClick={() => this.onMarkerClick(story.url)}
              className="customMarker"
              key={Math.random()}
              icon={{
                url: story.urlToImage,
                anchor: new google.maps.Point(32, 32),
                scaledSize: new google.maps.Size(64, 64)
              }}
            />
          )
        })}


      </Map>

    )
  }
}

// export default MapContainer;

const MapWrap = GoogleApiWrapper({ apiKey })(MapContainer);
export default MapWrap;

// export default GoogleApiWrapper({ apiKey })(MapContainer);

