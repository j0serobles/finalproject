import React, { useState } from "react";
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
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
         Spinner , 
        Alert} from 'reactstrap';

import { cancelDelivery,
         setCurrentDelivery } from '../../actions/deliveryActions';

const os = require('os');

class Delivery extends React.Component {

  constructor(props) { 
    super(props); 

    
    const socketURL = process.env.NODE_ENV === "production" ? '' : 'http://localhost:5000'; 



    //Communications socket: 
    this.socket = openSocket(socketURL);

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
    itemWeightUnits : 'lbs',
    errors      : {
      origAddress : '', 
      destAddress : '', 
      itemCount   : '', 
      itemDesc    : '', 
      itemWeight  : ''
    },
    showDeliveryOfferDialog    : false,
    showDeliveryRequestDialog  : false, 
    statusMessage              : ''
  }

}

  showDeliveryRequestDialog = (isOpen) => {
    this.setState( {showDeliveryRequestDialog : isOpen }) ; 
  }

  showDeliveryOfferDialog = (isOpen) => {
    this.setState( {showDeliveryOfferDialog : isOpen }) ; 
  }



  DeliveryRequestDialog = () => { 
    console.log ("DeliveryRequestDialog[56]:  state.showDeliveryRequestDialog=" + this.state.showDeliveryRequestDialog);
    
    let currentMessage = <p>
                           { `Looking for drivers to deliver: ${this.state.itemCount} ${this.state.itemDesc} `} <br></br>
                           <strong>{` from: ` }</strong><br></br> 
                           {` ${this.state.origAddress} `} <br></br>
                           <strong>{` to: `}</strong> <br></br>
                           {` ${this.state.destAddress}.  Please wait ...`} 
                         </p>

     if (this.state.showDeliveryRequestDialog) { 
      return (<AppModal modalState={this.state.showDeliveryRequestDialog} toggle={this.toggleDeliveryRequestDialog} backdrop="static" keyboard={false} > 
                <ModalHeader toggle={this.toggleDeliveryRequestDialog}>
                <Spinner className="pt-1" type="grow" color="primary" />
                <span>  Looking for drivers.</span>
                  </ModalHeader>
                <ModalBody> 
                  {currentMessage} 
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={ () => this.onCancelDelivery("Your request was cancelled.") }>Cancel Request</Button>{' '}
                </ModalFooter>
             </AppModal>)
    } else { 
      return null;
    }
  }


  onCancelDelivery = (message) => {
    this.props.cancelDelivery(this.state.deliveryId); 
    this.setState( { statusMessage: message });
    this.showDeliveryRequestDialog(false);
    this.showDeliveryOfferDialog(false);
    //Clear the message automatically after 10 seconds.
    setTimeout ( () => this.setState ( { statusMessage : '' } ), 10000);
    this.socket.emit('request-changed'); 
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
                  <Button color="primary" onClick={ () => this.onRejectOffer("Request cancelled.  The driver's offer was not accepted. ") }>Cancel Request</Button>{' '}
                </ModalFooter>
             </AppModal>)
    } else { 
      return null;
    }
  }

  /* Sends a new record to the database and signals a new delivery request.  */
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
              "itemWeightUnits"   : this.state.itemWeightUnits,
              "itemVolume"        : null, 
              "itemVolUnits"      : '',
              "totalCost"         : "0",
              "estimatedDuration" : "0", 
              "actualDuration"    : "0",
              "customer"          : "5dae4e815d63d136b0eebfa4"
        }; 
        console.log ('Delivery[149]', JSON.stringify(newDelivery, '', 2)); 
        axios.post('/api/delivery', newDelivery)
        .then( (res) => { 
          this.setState( { deliveryId : res.data._id } , console.log ('New delivery request saved.', res.data) ) ;
          this.props.setCurrentDelivery(res.data); 
          return (res);
         }) 
        .then(  (res) => { 
          //Signal server that a new delivery request has been created:
          console.log(`Delivery[157]: Before socket.on ${res.data._id}`);
          this.socket.emit('new-request-created');
          //Connect to socket and wait for a response msg with an offer
          console.log(`Delivery[160]: Before socket.on ${res.data._id}`);
          this.socket.on(`${res.data._id}`, (msg) => {
            console.log ('delivery-offer received.', msg);
            this.setState( { showDeliveryRequestDialog : false,
                             showDeliveryOfferDialog   : true 
                           }
                         );
           });
           console.log(`Delivery[168]: After socket.on ${res.data._id}`);
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
    this.showDeliveryOfferDialog(false); 
    this.setState ( { 
        statusMessage: ` Please meet the driver at the designated pick up location: ${this.state.origAddress}`
      });
  }

  onRejectOffer = (message) => { 
    //Customer has rejected the offer for delivery service.
    //Send message indicating the rejection, then take user 
    // to the delivery tracker page.
    this.socket.emit('offer-rejected', this.state.deliveryId); 
    this.showDeliveryOfferDialog(false); 
    this.setState ( { 
        statusMessage: message
      });
  }

  setUnitOfMeasure =  (weigthUOM) => this.setState({ itemWeightUnits : weigthUOM });



    render() {
        
      const {errors} = this.state;
      const StatusMessage = ()=>  this.state.statusMessage ? (
        <Alert color="warning" toggle={ () => this.setState( { statusMessage : ''} ) }>
          {this.state.statusMessage}
        </Alert>)
       : null

        return  !this.props.isGeolocationAvailable ? (
                    <div>Your browser does not support Geolocation</div>
                ) : !this.props.isGeolocationEnabled ? (
                      <div>Geolocation is not enabled</div>
                ) :   this.props.coords ? ( 
                     <div className="container">

                      
                        <Row className="mt-3">
                          <Col>
                          <StatusMessage />
                          </Col>
                        </Row>
                        
  
                       <Row className="mt-1">
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
                                        <AppDropdown items={['lbs','kg', 'gm', 'oz','lt']} parentCallback={ this.setUnitOfMeasure }/>
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

Delivery.propTypes = { 
  cancelDelivery      : PropTypes.func.isRequired, 
  setCurrentDelivery  : PropTypes.func.isRequired
}

const mapStateToProps = state => ( { 
  currentDelivery   : state.delivery.currentDelivery,
  storeErrorMessage : state.delivery.storeErrorMessage
});

export default connect (mapStateToProps,{ cancelDelivery, setCurrentDelivery })(geolocated({
  positionOptions: {
    enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(Delivery));