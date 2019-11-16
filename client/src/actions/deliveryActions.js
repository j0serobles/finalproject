import axios from 'axios';
import openSocket from 'socket.io-client'; 

import {  DATA_LOADING, 
          SET_CURRENT_DELIVERY, 
          CANCEL_DELIVERY,
          SET_ERROR  
} from './types';


export const setDataLoading = (isLoading) => {
    return {
        type: DATA_LOADING,
        payload : isLoading
    };
};

export const setCurrentDelivery = (delivery) => {
    console.log ("setCurrentDelivery action [26] called with " , delivery); 
    return {
        type: SET_CURRENT_DELIVERY,
        payload: delivery
    };
}

export const setDeliveryCancelled = () => {
    return { 
        type: CANCEL_DELIVERY
    };
};

export const setErrorMessage = (message) => {
    return { 
        type: SET_ERROR
    };
};


export const cancelDelivery = (deliveryId) => 
    
    dispatch => {
        console.log ("cancelDelivery called, ID: " , deliveryId);
        const socketURL = process.env.NODE_ENV === "production" ? '' : 'http://localhost:5000';  
        const socket = openSocket(socketURL);
        const cancelURL = `/api/delivery/${deliveryId}`;
        const userData  = { "status" : "X" } ; 
        axios.put(cancelURL, userData).then(res => {
            dispatch(setDataLoading(true)); 
            dispatch(setDeliveryCancelled());
            dispatch(setDataLoading(false));
            socket.emit('request-changed'); 
        }).catch(err => dispatch(setErrorMessage(err.response.data)));
    };