import React from 'react';
import GoogleMapReact from 'google-map-react';
let GoogleMapsAPIKEY =  require('../../config.js').GoogleMapsAPIKEY;


const AnyReactComponent = ({ text }) => <div>{ text }</div>;

const createMapOptions = () => {
  return (
    {
      minZoom: 3,
      fullscreenControl: false,
      zoomControl: false,
      streetViewControl: false,
      scaleControl: true,
      mapTypeControl: false
    }
  )
}

class MapContainerV2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {lat: this.props.lat, lng: this.props.long}
    }
  }

  render() {
    return (
      <div style={{ height: `340px`, width: `595px` }} className="map">
        <GoogleMapReact
          bootstrapURLKeys={{key: GoogleMapsAPIKEY}}
          center={this.props.center}
          zoom={12}
          layerTypes={this.props.shouldShowTransit ? ['TransitLayer'] : []}
          options={createMapOptions}
        >
          <AnyReactComponent
            lat={this.props.lat}
            lng={this.props.long}
            text={'Hello'} 
          />
        </GoogleMapReact>
      </div>
    )
  }
}

MapContainerV2.defaultProps = { 
  center: {lat: 51.515026, lng: -0.175809},
  zoom: 12
}


export default MapContainerV2;
