import axios from 'axios';
import setAuthToken from '../utility/setAuthToken';
import jwt_decode from 'jwt-decode';
import {  SET_LIST_FILTER , GET_DELIVERIES } from './types';
import { bindActionCreators } from 'C:/Users/joserobles/AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux';

export function fetchDeliveries(statusFilterString) { 
    return function(dispatch) {
       console.log ('fetchDeliveries action called. statusFilterString = ',  statusFilterString);  
       const deliveriesURI = statusFilterString ? 'api/delivery/status/' + statusFilterString : 'api/delivery/';  
       axios.get(deliveriesURI)
       .then(deliveries => dispatch(
         {
           type: GET_DELIVERIES, 
           payload: deliveries.data
         })
       )
       .catch( err => console.log(err));
    }
}

export function setListFilter(filterValueString) {
    return function(dispatch) { 
        dispatch( 
            {
                type: SET_LIST_FILTER,
                payload : filterValueString
            }
        );
    }
}
