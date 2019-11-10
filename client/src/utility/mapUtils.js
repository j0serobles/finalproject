import axios from 'axios';

//Contains different utility functions for the Map component.

// computeDistanceTime - Computes distance and time between two 
// location id's using the Google Distance Matrix API

let googleKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;


const mapUtils = { 

    computeDistanceTime( origLocationId, destLocationId ) {
          // origLocationId = Origination Location id from Google Places API
          // destLocationId = Destination location id from Google Places API

          let googleURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:" + origLocationId 
          + "&destinations=place_id:" + destLocationId + "&mode=driving&key=" + googleKey + "&libraries=geometry,drawing,places";

              console.log (`mapUtils.js[13] : ${googleURL}`);

              // axios.get (googleURL).then ( data => {
              //     console.log (data) ; 
              // }).catch ( error => {
              //     console.log (error) ; 
              // });
      }
    }

export default mapUtils;