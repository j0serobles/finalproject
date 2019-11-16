import { combineReducers } from 'redux';
import authReducer         from './authReducers';
import errorReducer        from './errorReducers';
import deliveryListReducer from './deliveryListReducer';
import deliveryReducer     from './deliveryReducer'; 

export default combineReducers({
    auth         : authReducer,
    errors       : errorReducer,
    deliveryList : deliveryListReducer, 
    delivery     : deliveryReducer 
});