import React          from "react";
import { geolocated } from "react-geolocated";
import Map            from "../../components/Map";
import AppDropdown    from "../../components/AppDropdown";
import AppModal       from "../../components/AppModal";
import axios          from 'axios';
import openSocket     from 'socket.io-client'; 
import './style.css';

import { Form,
         FormGroup,
         InputGroup,
         InputGroupAddon,
         Input, 
         Row, 
         Col,
         Button, 
         ModalHeader, 
         ModalBody, 
         ModalFooter,
         Spinner } from 'reactstrap';

const os = require('os');

class Delivery extends React.Component {

  constructor(props) { 
    super(props); 

    const port = process.env.PORT || 5000;

    console.log (`Delivery[30], process.env.PORT = ${process.env.PORT} , port is ${port}`); 
    console.log ("Delivery[31], hostname is " + os.hostname()) ; 

    console.log ("Delivery[35]:" + JSON.stringify(process.env, '', 2)); 

    //Communications socket: 
    this.socket = openSocket(`http://localhost:${port}`);

   this.state = {
    deliveryId : null,
    origAddress : "",
    origLocation : null,
    origLocationID: "",
    destAddress : "",
    destLocation: null,
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
    },
    showDeliveryOfferDialog    : false,
    showDeliveryRequestDialog  : false
  }

}

  toggleDeliveryRequestDialog = () => {
    this.setState( {showDeliveryRequestDialog : !this.state.showDeliveryRequestDialog }) ; 
  }

  toggleDeliveryOfferDialog = () => {
    this.setState( {showDeliveryOfferDialog : !this.state.showDeliveryOfferDialog }) ; 
  }


  DeliveryRequestDialog = () => { 
    console.log ("DeliveryRequestDialog[56]:  state.showDeliveryRequestDialog=" + this.state.showDeliveryRequestDialog);
    
    let currentMessage = `Looking for drivers to deliver ${this.state.itemCount} ${this.state.itemDesc} ` +
    ` from address ${this.state.origAddress} to ${this.state.destAddress}.  Please wait ...`;

     if (this.state.showDeliveryRequestDialog) { 
      return (<AppModal modalState={this.state.showDeliveryRequestDialog} toggle={this.toggleDeliveryRequestDialog}>
                <ModalHeader toggle={this.toggleDeliveryRequestDialog}>
                <Spinner type="grow" color="primary" />
                <span>  Looking for drivers.</span>
                  </ModalHeader>
                <ModalBody> 
                  {currentMessage} 
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleDeliveryRequestDialog}>Cancel Request</Button>{' '}
                </ModalFooter>
             </AppModal>)
    } else { 
      return null;
    }
  }


  //Shown when a driver has made an offer for delivery service.
  DeliveryOfferDialog = (msg) => { 
    const dialogMessage = `We can deliver ${this.state.itemCount} ${this.state.itemDesc} ` +
          ` from address ${this.state.origAddress} to ${this.state.destAddress}.  `        + 
          ` in about ${this.state.duration}, for $ ${this.state.cost}`;
    if (this.state.showDeliveryOfferDialog) { 
      return (<AppModal modalState={this.state.showDeliveryOfferDialog} toggle={this.toggleDeliveryOfferDialog}>
                <ModalHeader toggle={this.toggleDeliveryOfferDialog}>
                <span>  Driver available!</span>
                  </ModalHeader>
                <ModalBody> {dialogMessage} </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.acceptOffer}>Accept Offer</Button>{' '}
                  <Button color="primary" onClick={this.toggleDeliveryOfferDialog}>Cancel Request</Button>{' '}
                </ModalFooter>
             </AppModal>)
    } else { 
      return null;
    }
  }

  /* Opens a dialog informing user that app is looking for available drivers */
  submitDeliveryRequest = function(event) {
    event.preventDefault();
    if (this.validateForm(this.state.errors)) { 
      this.setState( { showDeliveryRequestDialog : true} ,
       () => {
        let newDelivery = {
              "origAddress"       : this.state.origAddress,
              "destAddress"       : this.state.destAddress,
              "origLocation"      : this.state.origLocation,
              "origLocationID"    : this.state.origLocationID,
              "destLocation"      : this.state.destLocation, 
              "destLocationID"    : this.state.destLocationID, 
              "status"            : "P", 
              "itemDescription"   : this.state.itemDesc,
              "itemWeight"        : this.state.itemWeight,
              "itemWeightUnits"   : '',
              "itemVolume"        : null, 
              "itemVolUnits"      : '',
              "totalCost"         : "0",
              "estimatedDuration" : "0", 
              "actualDuration"    : "0",
              "customer"          : "5dae4e815d63d136b0eebfa4"
        }; 
        console.log ('Delivery[89]', JSON.stringify(newDelivery, '', 2)); 
        axios.post('/api/delivery', newDelivery)
        .then( (res) => { 
            this.setState( { deliveryId : res.data._id } , console.log ('New delivery request saved.', res.data) ) ;
            return (res);
         }) 
        .then(  (res) => { 
          //Connect to socket and wait for a response msg with an offer
          
          console.log(`Delivery[98]: Before socket.on ${res.data._id}`);
          this.socket.on(`${res.data._id}`, (msg) => {
            console.log ('delivery-offer received.', msg);
            this.setState( { showDeliveryRequestDialog : false,
                             showDeliveryOfferDialog   : true 
                           }
                         );
           });
           console.log(`Delivery[103]: After socket.on ${res.data._id}`);
          
        })
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

  onOrigLocationChange = origLocation => {
    this.setState( {
      origLocation : origLocation
    }); 
  }

  onDestLocationChange = destLocation => {
    console.log ("OnDestLocationChange[150]", JSON.stringify(destLocation, '', 2)); 
    this.setState( {
      destLocation : destLocation
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

  acceptOffer = () => { 
    //Customer has accepted the offer for delivery service.
    //Send message indicating the acceptance, then take user 
    // to the delivery tracker page.
    this.socket.emit('offer-accepted', this.state.deliveryId); 
    this.toggleDeliveryOfferDialog();
  }

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
                              onOrigLocationChange={this.onOrigLocationChange}
                              onOrigLocationIDChange={this.onOrigLocationIDChange}
                              onDestLocationChange={this.onDestLocationChange}
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
                      <this.DeliveryRequestDialog />
                      <this.DeliveryOfferDialog />
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