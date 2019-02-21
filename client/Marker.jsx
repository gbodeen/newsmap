import React from 'react';
import { Marker, OverlayView } from 'react-google-maps';

class CustomMarker extends React.Component {

  onMarkerClick = (url) => {
    window.open(url);
  }

  getPixelPositionOffset = (width, height) => {
    return { x: -width / 2, y: -height - 10 };
  }

  render() {
    const { title, geocode, urlToImage, url } = this.props.story;
    return (
      <Marker
        title={title}
        position={geocode}
        icon="images/blackpointer.png"
      >
        <OverlayView
          key={Math.random()}
          position={geocode}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={this.getPixelPositionOffset}
        >
          <div className="customMarker" style={{ backgroundImage: `url("${urlToImage}")` }} onClick={() => this.onMarkerClick(url)} >{this.props.children}</div>
        </OverlayView>
      </Marker>
    )
  }
}

export default CustomMarker;