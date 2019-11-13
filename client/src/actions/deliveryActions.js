import axios from 'axios';
import setAuthToken from '../utility/setAuthToken';
import jwt_decode from 'jwt-decode';
import {  SET_LIST_FILTER , 
          GET_DELIVERIES, 
          DATA_LOADING, 
          TOGGLE_MODAL, 
          SET_CURRENT_DELIVERY, 
          SET_STATUS_MESSAGE, 
          SHOW_SPINNER, 
          HIDE_SPINNER } from './types';

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
}


export const showSpinner = () => {
    return { 
        type: SHOW_SPINNER
    };
};

export const hideSpinner = () => {
    return { 
        type: HIDE_SPINNER
    };
};

export const setStatusMessage = (message) => {
    return { 
        type: SET_STATUS_MESSAGE, 
        payload: message
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
