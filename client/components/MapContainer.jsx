import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle, BicyclingLayer } from "react-google-maps";

// const transit = {
//   "featureType": "transit.line",
//   "elementType": "geometry",
//   "stylers": [
//     {
//       "color": "#00007F"
//     },
//     {
//       "lightness": 19
//     }
//   ]
// }

const MapContainer = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{lat: props.lat, lng: props.long}}
    defaultOptions={{
      minZoom: 3,
      fullscreenControl: false,
      zoomControl: false,
      streetViewControl: false,
      scaleControl: true,
      mapTypeControl: false
      // styles: [...transit]
    }}
  >
    {props.isMarkerShown && <Marker position={{lat: props.lat, lng: props.long}}/>}
    {/* {props.shouldShowTransit &&  addTransitLayer.setMap(map)} */}
    <BicyclingLayer autoUpdate />
  </GoogleMap>
))

export default MapContainer;


// styles: [...administrative, ...landscape, ...poi, ...road, ...transit, ...water]