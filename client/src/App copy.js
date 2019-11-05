import React from 'react';
import logo from './logo.svg';
import './App.css';
import NoMatch from './pages/NoMatch';
import AppRoute from './components/AppRoute';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">

      <Router>
          <Switch>
              <Route exact path="/route" component={AppRoute} />
              {/* <Route exact path="/books" component={Books} />
              <Route exact path="/books/:id" component={Detail} /> */}
              <Route component={NoMatch} />
          </Switch>
      </Router>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */}
  );
}

export default App;
