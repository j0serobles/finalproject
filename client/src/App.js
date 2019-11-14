import React, { Component } from 'react';

// import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utility/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Nav          from './components/Nav';
import Landing      from './pages/Landing';
import Delivery     from './pages/Delivery';
import DeliveryList from './components/DeliveryList';
import About        from './pages/About';
import Search       from './pages/Search';
import Register     from "./components/auth/Register";
import Login        from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import NoMatch      from "./pages/NoMatch";

if(localStorage.jwtToken){
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
      store.dispatch(logoutUser());
      window.location.href = "./login";
  }
}

function App() {
  
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <Nav/>
        <Switch>
            <Route exact path="/home"       component={Landing}  />
            <Route exact path="/about"      component={About}    />
            <Route exact path="/search"     component={Search}   />
            <Route exact path="/register"   component={Register} />
            <Route exact path="/login"      component={Login}    /> 
            <Route exact path="/logout"     render={ () => { store.dispatch(logoutUser()); window.location.href = "./login" } } />
            <Route exact path="/"           component={Landing}  />
            <PrivateRoute exact path="/delivery"   component={Delivery} />
            <PrivateRoute exact path="/deliveries" component={DeliveryList} />
            <Route component={NoMatch} />
      </Switch>
      </div>
    </Router>
    </Provider>
  );
}

export default App;