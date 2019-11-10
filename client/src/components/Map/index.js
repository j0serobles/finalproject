import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import DirectionRendererComponent from '../DirectionRendererComponent'; 

import mapUtils  from '../../utility/mapUtils';

let googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
let googleMapsURL = "https://maps.googleapis.com/maps/api/js?key=" + googleMapsKey + "&libraries=geometry,drawing,places";

Geocode.setApiKey(googleMapsKey);
Geocode.enableDebug();

class Map extends Component {

  constructor( props ){
    super( props );
    this.state = {

      origAddress : {
        address: '',
        city: '',
        area: '',
        state: ''
      }, 
      destAddress : { 
        address: '',
        city: '',
        area: '',
        state: ''
      },
    mapPosition: {  // Passed from the calling component.  Becomes the initial position.
        lat: this.props.center.lat,
        lng: this.props.center.lng
    },
    origMarkerPosition: {  //Not set initially. Will be updated when orig address is selected.
        lat: '',
        lng: ''
    },
    destMarkerPosition: {
        lat: '',
        lng: ''
    },
    origPlaceId : '',
    destPlaceId : ''
  }
 }

/**
  * Get the current delivery address from the default map position and set those values in the state
  */
 componentDidMount() {

  Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
  
    (response) => {

      const address = response.results[0].formatted_address,
      addressArray =  response.results[0].address_components,
      city         = this.getCity( addressArray ),
      area         = this.getArea( addressArray ),
      state        = this.getState( addressArray ),
      destPlaceId  = this.getPlaceId( response.results[0] );
    
      console.log( `componentDidMount[65]: ${city}, ${area}, ${state}, ${destPlaceId}`);
    
      let newDestAddress = { ...this.state.destAdress }; 
      let newDestMarkerPosition = { ...this.state.destMarkerPosition};

      console.log (`componentDidMount[68]:` + JSON.stringify(newDestAddress));
      
      newDestAddress = { 
        address : ( address ) ? address : '',
        city   : ( city )    ? city    : '',
        area   : ( area )    ? area    : '',
        state  : ( state )   ? state   : ''
      };

      newDestMarkerPosition = {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      };

      console.log (`componentDidMount[76]` + JSON.stringify(newDestAddress));
      console.log (`componentDidMount[76]` + JSON.stringify(newDestMarkerPosition));
      
      this.setState( { destAddress : newDestAddress,
                       destPlaceId : ( destPlaceId ) ? destPlaceId : '',
                       destMarkerPosition : newDestMarkerPosition 
                     },  () => {
                                  this.props.handleAddressChange('destAddress', this.state.destAddress.address);
                                  this.props.onDestLocationIDChange(this.state.destPlaceId);
                                  this.props.onDestLocationChange(this.state.destMarkerPosition);
                               });
    },
   error => {
    console.error(error);
   }
  );
 };

 /**
  * Component should only update ( meaning re-render ), when address locations change
  *
  * @param nextProps
  * @param nextState
  * @return {boolean}
  */
 shouldComponentUpdate( nextProps, nextState ){

  if (
   this.state.origMarkerPosition.lat !== nextState.origMarkerPosition.lat ||
   this.state.destMarkerPosition.lat !== nextState.destMarkerPosition.lat ||
   this.state.origMarkerPosition.lng !== nextState.origMarkerPosition.lng ||
   this.state.destMarkerPosition.lng !== nextState.destMarkerPosition.lng
   ) {
    console.log ("Component update: 102: returns true"); 
   return true
  } else {
    console.log ("Component update: 102: returns false"); 
   return false
  }
 }

/**
  * Get the city and set the city input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getCity = ( addressArray ) => {
  let city = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
    city = addressArray[ i ].long_name;
    return city;
   }
  }
 };

/**
  * Get the area and set the area input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getArea = ( addressArray ) => {
  let area = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0]  ) {
    for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
     if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
      area = addressArray[ i ].long_name;
      return area;
     }
    }
   }
  }
 };

/**
  * Get the address and set the address input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getState = ( addressArray ) => {
  let state = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   for( let i = 0; i < addressArray.length; i++ ) {
    if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
     state = addressArray[ i ].long_name;
     return state;
    }
   }
  }
 };

 /**
  * Get the origination place_id and set it in the current state
  *
  * @param addressArray
  * @return {string}
  */
 getPlaceId = ( addressArray ) => {
  let placeId = '';
  placeId     = addressArray.place_id;
  return placeId;
 }

 /**
  * This Event triggers when the marker window is closed
  *
  * @param event
  */
 onInfoWindowClose = ( event ) => {
 };

/**
  * This Event triggers when the marker window is closed
  *
  * @param event
  */
 onInfoWindowClose = ( event ) => {
};

/**
  * When the user types an address in the origin search box
  * @param place
  */
 onOrigPlaceSelected = ( place ) => {
   //console.log (`onOrigPlaceSelected: ` + JSON.stringify(place, '', 2));
   const address  = place.formatted_address,
     addressArray =  place.address_components,
     city         = this.getCity( addressArray ),
     area         = this.getArea( addressArray ),
     state        = this.getState( addressArray ),
     origPlaceId  = this.getPlaceId( place ),
     latValue     = place.geometry.location.lat(),
     lngValue     = place.geometry.location.lng();
     
  // Set these values in the state.
    this.setState({
      origAddress : {
        address     : ( address ) ? address : '',
        area        : ( area )    ? area : '',
        city        : ( city )    ? city : '',
        state       : ( state )   ? state : ''
      },
     origMarkerPosition: {
      lat: latValue,
      lng: lngValue
     },
     mapPosition: {
      lat: latValue,
      lng: lngValue
     },
     origPlaceId : ( origPlaceId ) ? origPlaceId : ''
    },  () => { 
      console.log ("onOrigPlaceSelected[243]" + JSON.stringify(this.state)) 
      mapUtils.computeDistanceTime( this.state.origPlaceId, this.state.destPlaceId );
      this.props.handleAddressChange('origAddress', this.state.origAddress.address );
      this.props.onOrigLocationIDChange(this.state.origPlaceId);
      this.props.onOrigLocationChange(this.state.origMarkerPosition);
    });
   };

   /**
  * When the user types an address in the destination search box
  * @param place
  */
 onDestPlaceSelected = ( place ) => {
  //console.log (`onDestPlaceSelected: ` + JSON.stringify(place, '', 2));
  const address  = place.formatted_address,
    addressArray =  place.address_components,
    city         = this.getCity( addressArray ),
    area         = this.getArea( addressArray ),
    state        = this.getState( addressArray ),
    destPlaceId  = this.getPlaceId( place ),
    latValue     = place.geometry.location.lat(),
    lngValue     = place.geometry.location.lng();
    
 // Set these values in the state.
   this.setState({
     destAddress : {
       address: ( address ) ? address : '',
       area: ( area ) ? area : '',
       city: ( city ) ? city : '',
       state: ( state ) ? state : ''
      
     },
    destMarkerPosition: {
     lat: latValue,
     lng: lngValue
    },
    mapPosition: {
     lat: latValue,
     lng: lngValue
    },
    destPlaceId : ( destPlaceId ) ? destPlaceId : ''
   }, () => {
     console.log ("onDestPlaceSelected[243]" + JSON.stringify(this.state));
    this.props.handleAddressChange('destAddress', this.state.destAddress.address);
    this.props.onDestLocationIDChange(this.state.destPlaceId);
    this.props.onDestLocationChange(this.state.destMarkerPosition);
   });

  };

/**
  * When the marker is dragged you get the lat and long using the functions available from event object.
  * Use geocode to get the address, city, area and state from the lat and lng positions.
  * And then set those values in the state.
  *
  * @param event
  */
 onOrigMarkerDragEnd = ( event ) => {
  console.log( 'event', event );
  let newLat = event.latLng.lat(),
  newLng = event.latLng.lng(),
  addressArray = [];

   console.log (` Orig Latitude : ${newLat}`);
   console.log (` Orig Longitude : ${newLng}`);

   Geocode.fromLatLng( newLat , newLng ).then(
    response => {
     const address = response.results[0].formatted_address,
     addressArray =  response.results[0].address_components,
     city = this.getCity( addressArray ),
     area = this.getArea( addressArray ),
     state = this.getState( addressArray ),
     origPlaceId  = this.getPlaceId( response.results[0] );

     this.setState( {
       origAddress : {
         address  : ( address ) ? address : '',
         area     : ( area ) ? area : '',
         city     : ( city ) ? city : '',
        state    : ( state ) ? state : ''
       },
       origMarkerPosition: {
        lat: newLat,
        lng: newLng
       },
       mapPosition: {
        lat: newLat,
        lng: newLng
       },
       origPlaceId : ( origPlaceId ) ? origPlaceId : ''
     },() => {
      console.log ("onDestPlaceSelected[243]" + JSON.stringify(this.state));
      this.props.handleAddressChange('origAddress',this.state.origAddress.address);
      this.props.onOrigLocationIDChange(this.state.origPlaceId);
      this.props.onOrigLocationChange(this.state.origMarkerPosition);
    });
   },
   error => {
    console.error(error);
   }
  );
 };

 /**
  * When the destination marker is dragged you get the lat and long using the functions available from event object.
  * Use geocode to get the address, city, area and state from the lat and lng positions.
  * And then set those values in the state.
  *
  * @param event
  */
 onDestMarkerDragEnd = ( event ) => {
  console.log( 'event', event );
  let newLat = event.latLng.lat(),
  newLng = event.latLng.lng(),
  addressArray = [];

   console.log (` Latitude : ${newLat}`);
   console.log (` Longitude : ${newLng}`);

   Geocode.fromLatLng( newLat , newLng ).then(
    response => {
     const address = response.results[0].formatted_address,
     addressArray =  response.results[0].address_components,
     city = this.getCity( addressArray ),
     area = this.getArea( addressArray ),
     state = this.getState( addressArray ),
     destPlaceId  = this.getPlaceId( response.results[0] );

     this.setState( {
       destAddress: { 
         address  : ( address ) ? address : '',
         area     : ( area ) ? area : '',
         city     : ( city ) ? city : '',
         state    : ( state ) ? state : ''
       },
       destMarkerPosition: {
        lat: newLat,
        lng: newLng
       },
       mapPosition: {
        lat: newLat,
        lng: newLng
       },
       destPlaceId : ( destPlaceId ) ? destPlaceId : ''
     }, () => {
      console.log ("onDestPlaceSelected[243]" + JSON.stringify(this.state));
      this.props.handleAddressChange('destAddress', this.state.destAddress.address);
      this.props.onDestLocationIDChange(this.state.destPlaceId);
      this.props.onDestLocationChange(this.state.destMarkerPosition);
    });
   },
   error => {
    console.error(error);
   }
  );
 };


render(){

const AsyncMap = withScriptjs(
   withGoogleMap(
    props => (
      <GoogleMap google={this.props.google}
          defaultZoom={this.props.zoom}
          defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
      >
      {/* Origin Marker -- Visible when pick-up address is known */}
      {  this.state.origMarkerPosition.lat && 
      <Marker 
        google={this.props.google}
        name={'origin'}
        draggable={true}
        onDragEnd={ this.onOrigMarkerDragEnd }
        position={{ lat: this.state.origMarkerPosition.lat, lng: this.state.origMarkerPosition.lng }} 
        icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      />
      }

      {/*Destination Marker -- Visible when delivery address is known */}
      { this.state.destMarkerPosition.lat && 
      <Marker 
        google={this.props.google}
        name={'destination'}
        draggable={true}
        onDragEnd={ this.onDestMarkerDragEnd }
        position={{ lat: this.state.destMarkerPosition.lat, lng: this.state.destMarkerPosition.lng }}
      />
      }

    {/* Render the Directions iff both orig and dest positions are set */}
    { this.state.origMarkerPosition.lat &&  this.state.destMarkerPosition.lat &&
    <DirectionRendererComponent
            index={1} 
            key={1}
            strokeColor="#0000FF" 
            from=
            {
                  { lat  : this.state.origMarkerPosition.lat,
                    lng  : this.state.origMarkerPosition.lng, 
                    title: "Pick-Up Location" 
                    }
            }
            to=
            {
                  { lat   : this.state.destMarkerPosition.lat,
                    lng   : this.state.destMarkerPosition.lng,
                    title : "Drop-Off Location"
                  }
            }
    />
    }


   
    <div className="input-group mt-3 mb-3">
      <div className="input-group-prepend">
          <span className="input-group-text" id="origLocation">Pick-Up Location:</span>
       </div>        
       {/* For Autocomplete Search Box for origin location */}
       <Autocomplete
         type="text" 
         className="form-control"
         aria-label="origLocation" 
         aria-describedby="origLocation"
         name="origAddress"
         onChange={ (event) => this.props.handleAddressChange(event.target.name, event.target.value) }
         defaultValue = { this.state.origAddress.address }
         onPlaceSelected={ this.onOrigPlaceSelected }
         placeholder="Please select a pick-up location."
         types={['geocode']}
       />
    </div>
    
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="destLocation">Delivery Location:</span>
      </div>
      {/* For Autocomplete Search Box for destination */}
      <Autocomplete
        type="text" 
        className="form-control" 
        aria-label="destLocation" 
        aria-describedby="destLocation"
        name="destAddress"
        onChange={ (event) => this.props.handleAddressChange(event.target.name, event.target.value) }
        defaultValue={this.state.destAddress.address}
        onPlaceSelected={ this.onDestPlaceSelected }
        placeholder="Please select a delivery location."
        types={['geocode']}
      />
    </div>
   

        {/* InfoWindow on top of destination marker */}
        {/*
        <InfoWindow
          onClose={this.onInfoWindowClose}
          position={{ lat: ( this.state.origMarkerPosition.lat + 0.0018 ), lng: this.state.origMarkerPosition.lng }}
        >
          <div>
            <span style={{ padding: 0, margin: 0 }}>Pick-Up</span>
          </div>
        </InfoWindow>

        <InfoWindow
          onClose={this.onInfoWindowClose}
          position={{ lat: ( this.state.destMarkerPosition.lat + 0.0018 ), lng: this.state.destMarkerPosition.lng }}
        >
          <div>
            <span style={{ padding: 0, margin: 0 }}>Delivery</span>
          </div>
        </InfoWindow> */}   
      </GoogleMap>
    )
  )
);

let map;
  if( this.props.center.lat !== undefined ) {
   map = 
   <div>
     <AsyncMap
       googleMapURL={googleMapsURL}
       loadingElement={
       <div style={{ height: `100%` }} />
       }
       containerElement={
       <div style={{ height: this.props.height }} />
       }
       mapElement={
       <div style={{ height: `100%` }} />
       }
    />
    
    </div>
    
} else {
   map = <div style={{height: this.props.height}} />
  }
  return( map )
 }
}

export default Map;