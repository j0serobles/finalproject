import React from "react";
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAPS_API_KEY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    
    defaultZoom={13}
    defaultCenter={
      {
        lat: props.origCoordLatitude, 
        lng: props.origCoordLongitude 
      }
    }
  >
    {props.isMarkerShown && <Marker position={{ lat: props.origCoordLatitude, lng: props.origCoordLongitude }} />}
  </GoogleMap>
)

export default MapComponent;