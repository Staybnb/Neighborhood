import React from 'react';
import MapContainer from './MapContainer.jsx';
import MapContainerV2 from './MapContainerV2.jsx';
import TransitCheckbox from './TransitCheckbox.jsx';
let GoogleMapsAPIKEY =  require('../../config.js').GoogleMapsAPIKEY;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowTransit: false
    }
    this.toggleTransit = this.toggleTransit.bind(this);
  }

  toggleTransit() {
    this.setState({
        shouldShowTransit: !this.state.shouldShowTransit
    })
  }

  render() {
    return (
      <div id="map-section">
        <TransitCheckbox 
          shouldShowTransit={this.state.shouldShowTransit} 
          toggleTransit={this.toggleTransit}
        />
        <MapContainerV2
          lat={this.props.lat} 
          long={this.props.long} 
          shouldShowTransit={this.state.shouldShowTransit} 
        />
        {/* <MapContainer 
          isMarkerShown 
          shouldShowTransit={this.state.shouldShowTransit} 
          lat={this.props.lat} 
          long={this.props.long} 
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPIKEY}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `350px`, width: `595px` }} />}
          mapElement={<div style={{ height: `100%` }} />} 
        /> */}
        <div>Exact location information is provided after a booking is confirmed.</div>
      </div>
    )
  }
}

export default Map;
