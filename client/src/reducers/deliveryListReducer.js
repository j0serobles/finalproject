import { SET_LIST_FILTER , GET_DELIVERIES } from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
    deliveries : [],
    filterValue : ""
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_LIST_FILTER:
            return {
                ...state,
                filterValue: action.payload
            };
        case GET_DELIVERIES:
            //console.log("GET_DELIVERIES reducer called."); 
            return {
                ...state,
                deliveries: action.payload
            };
        default:
            return state;
    }
};