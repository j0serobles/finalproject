import { 
    SET_LIST_FILTER , 
    GET_DELIVERIES, 
    DATA_LOADING, 
    TOGGLE_MODAL, 
    SHOW_SPINNER,
    HIDE_SPINNER,
    SET_STATUS_MESSAGE
    } from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
    deliveries  : [],
    filterValue : "",
    isLoading   : false, 
    isModalOpen : false,
    currentDelivery : null,
    statusMessage   : '',
    showStatusSpinner : false
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
        case TOGGLE_MODAL:
            return {
                ...state,
                isModalOpen:   !state.isModalOpen, 
                statusMessage: ''
            };
            case SHOW_SPINNER:
                return {
                    ...state,
                    showStatusSpinner: true
                };
            case HIDE_SPINNER:
                return {
                     ...state,
                     showStatusSpinner: false
                };
            case SET_STATUS_MESSAGE:
                return {
                  ...state,
                  statusMessage : action.payload
                };
        default:
            return state;
    }
};