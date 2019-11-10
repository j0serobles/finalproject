import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input, Col, Spinner, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'; 
import { ListGroup, ListGroupItem } from 'reactstrap';
import { fetchDeliveries,  setListFilter, setDataLoading, toggleModal} from '../../actions/deliveryActions';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

let googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
let googleMapsURL = "https://maps.googleapis.com/maps/api/js?key=" + googleMapsKey + "&libraries=geometry,drawing,places";


class DeliveryList extends Component {

    constructor(props) { 
        super(props); 
        this.state = { 
          currentDelivery : null
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
                    <Button color="primary" onClick={this.props.toggleModal}>Make Offer</Button>
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

      const DialogContents = compose(
          withProps({
            googleMapURL    : googleMapsURL,
            loadingElement  : <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `300px`}} />,
            mapElement      : <div style={{ height: `100%` }} />,
          }),
          withScriptjs,
          withGoogleMap
        )( props =>
             <GoogleMap defaultZoom={8} defaultCenter={{ lat: 28.441508, lng:  -81.616709 }} >
               <Marker position={{ lat: 28.441508, lng: -81.616709 }} />
             </GoogleMap>
        );


      const DialogContents2 = () => ( this.state.currentDelivery &&
      <div>
        <strong>Pick Up Address:</strong> {this.state.currentDelivery.origAddress}<br></br>
        <strong>Delivery Address:</strong> {this.state.currentDelivery.destAddress}<br></br>
        <strong>Items: </strong> { this.state.currentDelivery.itemCount + " " + this.state.currentDelivery.itemDescription + ", weighting about " +  
                                   this.state.currentDelivery.itemWeight + this.state.currentDelivery.itemWeightUnits }
      </div>);
      

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
                <DialogContents/>
                </Col>
                </Row>
                <Row>
                  <Col>
                <DialogContents2/>
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
