// Contains different utility functions for the Map component.
// computeDistanceTime - Computes distance and time between two 
// location id's using the Google Distance Matrix API

const router  = require("express").Router();
let distance  = require('google-distance-matrix');
let googleKey = process.env.GOOGLE_PLACES_API_KEY;


//Matches api/maps/distance
router.post('/distance', (req, res) => {
        console.log ("/api/maps/distance  called with : " , JSON.stringify(req.body));
        const origLocation=`${req.body.origLoc.lat},${req.body.origLoc.lng}`
        const destLocation=`${req.body.destLoc.lat},${req.body.destLoc.lng}`;
        console.log (`${origLocation},${destLocation}`);
        const origins = [origLocation]; 
        const destinations = [destLocation];
        distance.key(googleKey);
        distance.units('imperial'); 

        const computeCost = (distance) => {

            // Estiamted cost = (min cost) + (variable amount)
            //Min cost = 50
            // If computed cost < min cost then return min cost
            // IF computed cost > min then return computed cost
            const minCost      = 50;
            const computedCost = ( parseFloat(distance) * 3) > minCost ? parseFloat(distance) * 3 
            : minCost; 
            return (computedCost); 
        }
  
    distance.matrix(origins, destinations, function (err, distances) {
        if (err) {
            return console.log(err);
        }
        if(!distances) {
            return console.log('no distances');
        }
        console.log (distances.status); 
        if (distances.status == 'OK') {
            for (var i=0; i < origins.length; i++) {
                for (var j = 0; j < destinations.length; j++) {
                    let origin = distances.origin_addresses[i];
                    let destination = distances.destination_addresses[j];
                    if (distances.rows[0].elements[j].status == 'OK') {
                        let distance = distances.rows[i].elements[j].distance.text;
                        let duration = distances.rows[i].elements[j].duration.text;
                        let results = { distance : parseInt(distance.replace(/\,/g,'')), 
                                         duration : duration, 
                                         cost     : parseInt(computeCost(distance))
                                      };
                       
                        console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance + ' and should take aprox. ' + duration);
                        return res.json(results); 
                    } else {
                        console.log(destination + ' is not reachable by land from ' + origin);
                    }
                }
            }
        }
    });
  });

module.exports=router;