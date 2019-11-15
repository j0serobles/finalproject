import {  
    DATA_LOADING, 
    SET_CURRENT_DELIVERY, 
    CANCEL_DELIVERY,
    SET_ERROR} from '../actions/types';

const initialState = {
    currentDelivery : null, 
    storeErrorMessage : ''
}

export default function(state = initialState, action){
    switch(action.type){
        case DATA_LOADING:
          return {
            ...state,
            loading: action.payload
        };
       case SET_CURRENT_DELIVERY : 
        console.log("deliveryReducer[34] called with ", action.payload);
            return {
                ...state,
                currentDelivery: action.payload
            };
        case CANCEL_DELIVERY: 
            return { 
                ...state,
                currentDelivery : null
            };
            case SET_ERROR:
            return {
                ...state,
                storeErrorMessage: action.payload
            };
        default:
            return state;
    }
};
