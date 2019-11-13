/*global google*/
import React from 'react'
import  { compose, withProps, lifecycle } from 'recompose'
import  {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer} from 'react-google-maps'

class StatMap extends React.Component {
  constructor(props){
    super(props)
  }

 

  render() {
 
    console.log (JSON.stringify(this.props, '', 2)); 

    const origLat = this.props.origLat;
    const origLng = this.props.origLng; 
    const destLat = this.props.destLat; 
    const destLng = this.props.destLng;

    const DirectionsComponent = compose(
      withProps({
        googleMapURL: this.props.gMapsURL,
        loadingElement: <div style={{ height: `350px` }} />,
        containerElement: <div style={{ width: `100%` }} />,
        mapElement: <div style={{height: `350px`, border : `1px solid` }}  />,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() { 
          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route({
            origin:      new google.maps.LatLng(origLat,origLng),
            destination: new google.maps.LatLng(destLat,destLng),
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
               this.setState({
                 directions: {...result},
                 markers: true
               })
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      })
    )(props =>
      <GoogleMap >
        {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers}/>}
      </GoogleMap>
    );

return ( <DirectionsComponent/> )

  }
}

export default StatMap;