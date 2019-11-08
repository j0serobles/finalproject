import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import deliveryListReducer from './deliveryListReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    deliveryList : deliveryListReducer 
});