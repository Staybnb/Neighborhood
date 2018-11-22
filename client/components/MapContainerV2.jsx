import React from 'react';
import GoogleMapReact from 'google-map-react';
let GoogleMapsAPIKEY =  require('../../config.js').GoogleMapsAPIKEY;


const AnyReactComponent = ({ text }) => <div>{ text }</div>;

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
          layerTypes={['TransitLayer']}
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
