import React          from "react";
import { geolocated } from "react-geolocated";
import Map            from "../../components/Map";
import AppDropdown       from "../../components/AppDropdown";
import Modal             from "../../components/Modal";
import axios             from 'axios';
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
import Axios from "axios";

class Delivery extends React.Component {
  state = {
    showModal : false,
    origAddress : "",
    origLocationID: "",
    destAddress : "",
    destLocationID: "",
    itemCount   : 1,
    itemDesc    : "",
    itemWeight  : 0, 
    errors      : {
      origAddress : '', 
      destAddress : '', 
      itemCount   : '', 
      itemDesc    : '', 
      itemWeight  : ''
    }
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
    if (this.validateForm(this.state.errors)) { 
      this.setState( {showModal : true} ,
       () => {
        let newDelivery = {
              "origAddress"       : this.state.origAddress,
              "destAddress"       : this.state.destAddress,
              "origLocationID"    : this.origLocationID, 
              "destLocationID"    : this.destLocationID, 
              "status"            : "P", 
              "itemDescription"   : this.itemDesc,
              "itemWeight"        : this.itemWeight,
              "itemWeightUnits"   : '',
              "itemVolume"        : null, 
              "itemVolUnits"      : '',
              "totalCost"         : "0",
              "estimatedDuration" : "0", 
              "actualDuration"    : "0",
              "customer"          : ""
        }
        axios.post('/api/delivery', newDelivery)
        .then( (res) => console.log ('New delivery request saved', res.data))
        .catch( error => console.log (error) ) ; 
        });
      } 
    }

  validateForm = errorsObject => {
      let valid = true;
      Object.values(errorsObject).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
      );
      if ( (!this.state.destAddress || this.state.destAddress.length === 0)    ||
           (!this.state.origAddress || this.state.origAddress.length === 0)    ||
           (!this.state.itemCount   || parseInt(this.state.itemCount) <= 0)    ||
           (!this.state.itemDesc    || this.state.itemDesc.length     < 2)     ||
           (!this.state.itemWeight  || parseFloat(this.state.itemWeight) <= 0) ) valid = false;

      return valid;
    }

  handleInputChange = event => {
    let errors = this.state.errors;
    const {name, value} = event.target; 
    console.log ("Handle input change [78]", name , "=", value); 
    
    switch (name) { 
      case 'itemCount'  : errors.itemCount   = (!value || parseInt(value) <= 0) ? 'Please enter 1 or more.' : ''; 
      break; 
      case 'itemDesc'   : errors.itemDesc    = (!value || value.length < 2) ? 'Please enter an item description.' : ''; 
      break; 
      case 'itemWeight' : errors.itemWeight  = (!value || parseFloat(value) <= 0) ? 'Please enter an aprox. weigth.' : ''; 
      break;
      default: 
      break; 
    }
    this.setState({ [name]: value, errors });
  };

  onOrigLocationIDChange = origLocationID => {
    this.setState( {
      origLocationID : origLocationID
    }); 

  }

  onDestLocationIDChange = destLocationID => {
    this.setState( {
      destLocationID : destLocationID
    }); 

  }
  handleAddressChange = ( addressAttributeName, addressAttributeValue) => {

    //Set this component's stat origAddress and destAddress accordingly, so they can be 
    //used later to validate the form  and display the dialog.

    console.log ("handleAddressChange : ", addressAttributeName,  addressAttributeValue );

    let errors = this.state.errors;

    this.setState({ [addressAttributeName] : addressAttributeValue } , () => {
      errors.origAddress = (!this.state.origAddress || this.state.origAddress.length === 0) ? 'A pickup address is required.'   : '';
      errors.destAddress = (!this.state.destAddress || this.state.destAddress.length === 0) ? 'A delivery address is required.' : '';
    });
  };

    render() {
        
      const {errors} = this.state;

        return  !this.props.isGeolocationAvailable ? (
                    <div>Your browser does not support Geolocation</div>
                ) : !this.props.isGeolocationEnabled ? (
                      <div>Geolocation is not enabled</div>
                ) :   this.props.coords ? ( 
                     <div className="container">
                       <Row>
                         <Col sm={12}>
                            <Map
                              google={this.props.google}
                              center={
                                { lat : this.props.coords.latitude, 
                                  lng : this.props.coords.longitude
                                }
                              }
                              height='20em'
                              zoom={15}
                              handleAddressChange={this.handleAddressChange}
                              onOrigLocationIDChange={this.onOrigLocationIDChange}
                              onDestLocationIDChange={this.onDestLocationIDChange}
                            />
                          </Col>
                        </Row>
                        <Row id="deliveryRequestForm">
                         <Col sm={12}>
                            <Form>
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
                                    {errors.itemCount.length > 0 && <span className="error">{errors.itemCount}</span>}
                                  </Col>
                                  <Col>
                                  <InputGroup >
                                    <InputGroupAddon addonType="prepend">Description</InputGroupAddon>
                                    <Input type="text" 
                                           value={this.state.itemDesc} 
                                           onChange={this.handleInputChange}
                                           name="itemDesc"
                                    />
                                    </InputGroup>
                                    {errors.itemDesc.length > 0 && <span className="error">{errors.itemDesc}</span>}
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
                                    {errors.itemWeight.length > 0 && <span className="error">{errors.itemWeight}</span>}
                                  </Col>
                                </FormGroup>
                                <Button 
                                  color="primary"
                                  type="submit" 
                                  onClick={(event) => this.submitDeliveryRequest(event)}>Submit Request</Button>
                              </Form>
                              </Col>
                              </Row>
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