import React from 'react';
import MapContainer from './MapContainer.jsx';
import TransitCheckbox from './TransitCheckbox.jsx';

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
        <MapContainer
          lat={this.props.lat} 
          long={this.props.long} 
          shouldShowTransit={this.state.shouldShowTransit} 
        />
        <div>Exact location information is provided after a booking is confirmed.</div>
      </div>
    )
  }
}

export default Map;
