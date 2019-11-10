import React, { Component } from 'react';

import {
    StaticGoogleMap,
    Marker,
    Path,
    Direction,
  } from 'react-static-google-map';
  
 

function StaticMap(props) {

    let googleKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

    console.log ("StaticMap[14]" , props);

    const origin      = props.origLocation.lat + "," + props.origLocation.lng; 
    const destination = props.destLocation.lat + "," + props.destLocation.lng;

    console.log (origin, destination);

      return (
        <div>
                <StaticGoogleMap size="450x350" apiKey={googleKey}>
                    <Marker id="origMarker"
                    location={ props.origLocation }
                    color="blue"
                    label="Start"
                    />
                    <Marker id="destMarker"
                    location={ props.destLocation }
                    color="red"
                    label="End"
                    />
                    {/* <Direction
                      origin="28.5217648,-81.46345210000004"
                      destination="28.4415297,-81.61667729999999" 
                      /> */}
                    <Direction
                      origin={origin}
                      destination={destination} />

                </StaticGoogleMap>
        </div>
      );
    }

  export default StaticMap;