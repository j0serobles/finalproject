import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import axios from 'axios';
import  {Form, FormGroup, Label, Input, Col} from 'reactstrap'; 
import {fetchDeliveries,  setListFilter } from '../../actions/deliveryActions';



class DeliveryList extends Component {

    constructor(props) { 
        super(props); 
        this.props.fetchDeliveries('P'); 
    }

    onChange = (e) => {
        console.log (`onChange called. Event target name = ${e.target.name}, Event value is ${e.target.value}`);
        this.props.setListFilter(e.target.value);
        this.props.fetchDeliveries(e.target.value); 
    }

    render() {

        const deliveryList = this.props.deliveries.map ( delivery => (
            <div className="text-left" key={delivery._id}>
                <p><strong>Pick up at :</strong> {delivery.origAddress}</p>
                <p><strong>Deliver to :</strong> {delivery.destAddress} </p>
                <p><strong>Item(s) Description:</strong> {delivery.itemDescription}</p>
                <hr />
            </div>
        ) );

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


        return (
            <div className="container">
              <h2>Deliveries</h2>
              {filterForm}
              <hr />
              {deliveryList}
            </div>
        )
    }
}

DeliveryList.propTypes = { 
    fetchDeliveries : PropTypes.func.isRequired, 
    deliveries      : PropTypes.array.isRequired,
    filterValue     : PropTypes.string
}

const mapStateToProps = state => ( { 
    deliveries : state.deliveryList.deliveries,
    filterValue: state.deliveryList.filterValue
});

export default connect (mapStateToProps, { fetchDeliveries, setListFilter })(DeliveryList);
