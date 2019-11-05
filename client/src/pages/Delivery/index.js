import React          from "react";
import { geolocated } from "react-geolocated";
import Map            from "../../components/Map";
import AppAutocomplete   from "../../components/AppAutocomplete";
import AppDropdown       from "../../components/AppDropdown";
import Modal             from "../../components/Modal";
import './style.css';

import { Form,
         FormGroup,
         InputGroup,
         InputGroupAddon,
         Input,
         Button, 
         Container, 
         Row, 
         Col} from 'reactstrap';

class Delivery extends React.Component {
  state = {
    showModal : false,
    origAddress : "",
    destAddress : "",
    itemCount   : 0,
    itemDesc    : "",
    itemWeight  : 0
  }

  toggleDialog = () => {
    this.setState( {showModal : !this.state.showModal }) ; 
  }

  DeliveryRequestDialog = () => { 
    console.log ("DeliveryRequestDialog() called state.showmodal=" + this.state.showModal);
    const dialogMessage = `Looking for drivers to deliver ${this.state.itemCount} ${this.state.itemDesc} ` +
                    ` from address ${this.state.origAddress} to ${this.state.destAddress}.  `              + 
                    ` Please wait ...`;
    if (this.state.showModal) { 
      return (<Modal 
                modalTitle="Looking for Drivers..."
                modalState={this.state.showModal} 
                toggle={this.toggleDialog}
                buttonLabel="Cancel Request"
                >
               {dialogMessage}
             </Modal>)
    } else { 
      return null;
    }
  }

  /* Opens a dialog informing user that app is looking for available drivers */
  submitDeliveryRequest = function(event) {
    event.preventDefault();
    this.setState( {showModal : true}) ; 
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleAutocompleteOnClick = (itemDesc) => {
    console.log ("handleAutocompleteOnClick[64]: " + itemDesc);
    this.setState({
      itemDesc: itemDesc
    });
  };

  handleAddressChange = ( origAddress, destAddress ) => {
    console.log ("handleAddressChange : " + origAddress + " , " + destAddress);
    this.setState({
      origAddress : origAddress,
      destAddress : destAddress
    });
  };

    render() {
        return  !this.props.isGeolocationAvailable ? (
                    <div>Your browser does not support Geolocation</div>
                ) : !this.props.isGeolocationEnabled ? (
                      <div>Geolocation is not enabled</div>
                ) :   this.props.coords ? ( 
                     <div className="container">

                     <Map
                       google={this.props.google}
                       center={
                         { lat : this.props.coords.latitude, 
                           lng : this.props.coords.longitude
                         }
                       }
                       height='300px'
                       zoom={15}
                       handleAddressChange={this.handleAddressChange}
                     /> 
                     <Form id="deliveryRequestForm">
                        <FormGroup row>
                          <Col>
                            <InputGroup >
                              <InputGroupAddon addonType="prepend">Amount</InputGroupAddon>
                              <Input type="text" 
                                     value={this.state.itemCount} 
                                     onChange={this.handleInputChange}
                                     name="itemCount"
                                     />
                            </InputGroup>
                          </Col>
                          <Col>
                              <AppAutocomplete 
                                label="Description" 
                                suggestions={['Jewlery Boxes','Grocery Bags', 'Shopping Bags' , 'Letters', 'Envelopes', 'Small Boxes', 'Medium Boxes', 'Large Boxes']}
                                name="itemDesc"
                                value={this.state.itemDesc}
                                handleOnClick={this.handleAutocompleteOnClick}
                              />
                          </Col>
                          <Col>
                            <InputGroup >
                              <InputGroupAddon addonType="prepend">Aprox. Weight (each)</InputGroupAddon>
                              <Input type="text"
                                     value={this.state.itemWeight}
                                     name="itemWeight"
                                     onChange={this.handleInputChange}
                              />
                              <InputGroupAddon addonType="append">
                                <AppDropdown items={['lbs','kg', 'gm', 'oz','lt']} />
                              </InputGroupAddon>
                            </InputGroup>
                          </Col>
                        </FormGroup>
                        <Button type="submit" onClick={(event) => this.submitDeliveryRequest(event)}>Submit Request</Button>
                      </Form>
                      <this.DeliveryRequestDialog/>
                      </div>
                ) : (
                    <div>Getting the location data&hellip; </div>
                );
    }
}
 
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Delivery);