import axios from 'axios';
import setAuthToken from '../utility/setAuthToken';
import jwt_decode from 'jwt-decode';
import {  SET_LIST_FILTER , GET_DELIVERIES, DATA_LOADING, TOGGLE_MODAL, SET_CURRENT_DELIVERY } from './types';

export const setDataLoading = (isLoading) => {
    return {
        type: DATA_LOADING,
        payload : isLoading
    };
};


export const toggleModal = () => {
    return {
        type: TOGGLE_MODAL
    };
};


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
