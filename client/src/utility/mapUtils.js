//Contains different utility functions for the Map component.
// computeDistanceTime - Computes distance and time between two 
// location id's using the Google Distance Matrix API

import axios from 'axios';
let distance = require('google-distance-matrix');
let googleKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;


const mapUtils = { 

    computeDistanceTime( orig,dest ) {
        console.log ("computeDistanceTime called with : " , JSON.stringify(orig), JSON.stringify(dest)) ;
         var origins      = [ orig,orig ];  
         var destinations = [dest,dest];
        distance.key(googleKey);
        distance.units('imperial'); 


     
    distance.matrix(origins, destinations, function (err, distances) {
        if (err) {
            return console.log(err);
        }
        if(!distances) {
            return console.log('no distances');
        }
        if (distances.status == 'OK') {
            for (var i=0; i < origins.length; i++) {
                for (var j = 0; j < destinations.length; j++) {
                    var origin = distances.origin_addresses[i];
                    var destination = distances.destination_addresses[j];
                    if (distances.rows[0].elements[j].status == 'OK') {
                        var distance = distances.rows[i].elements[j].distance.text;
                        console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                    } else {
                        console.log(destination + ' is not reachable by land from ' + origin);
                    }
                }
            }
        }
    });
  }
}

export default mapUtils;