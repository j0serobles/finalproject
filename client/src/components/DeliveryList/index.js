import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input, Col, Spinner, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert  } from 'reactstrap'; 
import { ListGroup, ListGroupItem } from 'reactstrap';
import { fetchDeliveries,  setListFilter, setDataLoading, toggleModal} from '../../actions/deliveryActions';
import { compose, withProps } from "recompose";
import StaticMap from '../StaticMap'
import StatMap   from '../StatMap';
import openSocket from 'socket.io-client'; 



let googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
let googleMapsURL = "https://maps.googleapis.com/maps/api/js?key=" + googleMapsKey + "&libraries=geometry,drawing,places";
let socketURL     = process.env.NODE_ENV === "production" ? '' : 'http://localhost:5000'; 


class DeliveryList extends Component {

    constructor(props) { 
        super(props); 
        this.state = { 
          currentDelivery : null,
          showStatusSpinner : false,
          statusMessage   : ''
        }
        this.props.fetchDeliveries('P'); 
    }

    onChange = (e) => {
        console.log (`onChange called. Event target name = ${e.target.name}, Event value is ${e.target.value}`);
        this.props.setListFilter(e.target.value);
        this.props.setDataLoading(true);
        this.props.fetchDeliveries(e.target.value); 
        this.props.setDataLoading(false); 
    }


    DeliveryInfoDialog = (props) => {  
      console.log ("DeliveryInfoDialog() called state.isModalOpen=" + this.props.isModalOpen);
      if (this.props.isModalOpen) { 
        return (<Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal}>
                  <ModalHeader toggle={this.props.toggleModal}>Delivery Details</ModalHeader>
                  <ModalBody>
                     {props.children}
                  </ModalBody>
                  <ModalFooter>
                    { !this.state.showStatusSpinner && <Button color="primary" onClick={()=> this.onNotifyOffer(this.state.currentDelivery)}>Make Offer</Button> }
                    <Button color="primary" onClick={this.props.toggleModal}>Dismiss</Button>
                  </ModalFooter>
                </Modal>)
      } else { 
        return null;
      }
    };

    handleButtonClick = delivery => { 
      //Executes when the "Open" button is clicked for a delivery list item.
      this.setState ( { currentDelivery: delivery } , () => this.props.toggleModal()) ; 
    }

    //Executes when driver sends offer to customer.  Sends message to Delivery component indicating an offer to complete the shipment.
    onNotifyOffer = (delivery) => { 
      const socket = openSocket(socketURL);
      console.log ('Before emit for ' , `${delivery._id}`);
      socket.emit('delivery-offer', delivery._id); 
      
      //After offer message is sent, wait for customer to reply.
      this.setState( { 
        statusMessage     : "Waiting for customer to accept/reject offer.",
        showStatusSpinner : true
      });
      
      //When acceptance response is received, remove the spinner and set status message.
      socket.on(`${delivery._id}-accepted`, (msg) => { 
        console.log('DeliveryList[77] : ', msg); 
        this.setState ( {
          showStatusSpinner : false,
          statusMessage     : ' Offer was accepted, please proceed to the pick-up location.'
        }); 
      })
    }



    ///////////////////////////////////////////////////////////////////////////
    
    render() {

        let deliveryList;
        let deliveryListItems;
       

        

        if (this.props.deliveries.length > 0) { 
          deliveryListItems = this.props.deliveries.map ( delivery => (
            <ListGroupItem className="text-left" href="#" key={delivery._id} action>
                <Row>
                    <Col sm={10}>
                      <strong>Pick up at :</strong>         {delivery.origAddress}<br></br>
                      <strong>Deliver to :</strong>         {delivery.destAddress}<br></br>
                      <strong>Item(s) Description:</strong> {delivery.itemDescription}           
                    </Col>
                    <Col sm={2}>
                     <Button color="primary" className="align-middle mt-3" onClick={ () => this.handleButtonClick(delivery) }>Open</Button>
                    </Col>

                </Row>
            </ListGroupItem>
          ));

          deliveryList =
            <ListGroup>
              {deliveryListItems}      
            </ListGroup>
        }
        else { 
            deliveryList = <p>No deliveries found.</p>
        }

        const filterForm =  
        <Form>
        <FormGroup row>
            <Label for="deliveryStatus">Delivery Status</Label>
            <Col sm={4}>
            <Input type="select" name="filterValue" id="deliveryStatus" value={this.props.filterValue} onChange={this.onChange} >
            <option value="P">Pending</option>
            <option value="A">Accepted</option>
            <option value="I">In Progress</option>
            <option value="D">Delivered</option>
            <option value="C">Cancelled</option>
            </Input>
            </Col>
        </FormGroup>
      </Form>;

      const spinner = this.props.isDataLoading ? <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" /> : null; 


      
      const DialogContents = () => 
         this.state.currentDelivery &&
         <div>
            <StatMap origLat={this.state.currentDelivery.origLocation.lat}
                    origLng={this.state.currentDelivery.origLocation.lng}  
                    destLat={this.state.currentDelivery.destLocation.lat}
                    destLng={this.state.currentDelivery.destLocation.lng} 
                    gMapsURL={"https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            />
            <strong>Pick Up Address:</strong><br></br>  {this.state.currentDelivery.origAddress}<br></br>
            <strong>Delivery Address:</strong><br></br> {this.state.currentDelivery.destAddress}<br></br>
            <strong>Items: </strong><br></br> { this.state.currentDelivery.itemCount + " " + this.state.currentDelivery.itemDescription + ", weighting about " +  
                                      this.state.currentDelivery.itemWeight + this.state.currentDelivery.itemWeightUnits                        
                                      }
                                      { this.state.statusMessage && 
                                          <Alert className="mt-3" color="info" 
                                                 toggle={ () => this.setState( { statusMessage : ''} ) }>
                                            {this.state.showStatusSpinner && <span>  <Spinner type="grow" color="primary" /> </span>}
                                            <span>  {this.state.statusMessage}</span>
                                           
                                          </Alert>
                                      }
         </div>
      
      

        return (
            <div className="container">
              <h2>Deliveries</h2>
              {filterForm}
              {spinner}
              <hr />
              {deliveryList}
              <this.DeliveryInfoDialog>
                <Row>
                  <Col>
                <DialogContents />
                </Col>
                </Row>
              </this.DeliveryInfoDialog>
            </div> 
        )

      }
  }

DeliveryList.propTypes = { 
    fetchDeliveries : PropTypes.func.isRequired, 
    deliveries      : PropTypes.array.isRequired,
    filterValue     : PropTypes.string, 
    isDataLoading   : PropTypes.bool,
    isModalOpen     : PropTypes.bool

}

const mapStateToProps = state => ( { 
    deliveries    : state.deliveryList.deliveries,
    filterValue   : state.deliveryList.filterValue, 
    isDataLoading : state.deliveryList.isLoading, 
    isModalOpen   : state.deliveryList.isModalOpen
});

export default connect (mapStateToProps, { fetchDeliveries, setListFilter, setDataLoading, toggleModal})(DeliveryList);
