import { SET_LIST_FILTER , GET_DELIVERIES, DATA_LOADING } from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
    deliveries : [],
    filterValue : "",
    isLoading   : false
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
        case DATA_LOADING:
          return {
            ...state,
            loading: action.payload
        };
        default:
            return state;
    }
};