import React from 'react';
import { Marker, OverlayView } from 'react-google-maps';

class CustomMarker extends React.Component {

  onMarkerClick = (url) => {
    window.open(url);
  }

  render() {
    const { title, geocode, urlToImage, url } = this.props.story;
    // console.log(this.props);
    return (
      <Marker
        title={title}
        position={geocode}
        icon="images/transparent_1x1.png"
      >
        <OverlayView
          key={Math.random()}
          position={geocode}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={this._getPixelPositionOffset}
        >
          <div className="customMarker" style={{ backgroundImage: `url("${urlToImage}")` }} onClick={() => this.onMarkerClick(url)} >{this.props.children}</div>
        </OverlayView>
      </Marker>
    )
  }
}

export default CustomMarker;