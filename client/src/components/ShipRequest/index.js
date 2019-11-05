import React from 'react';

class ShipRequest extends React.Component {
  
    state = {
        itemDescription : ""
    }

    render () {
    
        return (
            <AppAutocomplete suggestions={["White", "Black", "Green", "Blue", "Yellow", "Red"]} />
        );
    }
}
export default ShipRequest;
