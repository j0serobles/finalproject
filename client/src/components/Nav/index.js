import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, NavLink  } from "react-router-dom";
import { Dropdown, 
  DropdownToggle, 
  DropdownMenu,
  DropdownItem, 
  Button, 
  Row,
  Col,
  NavbarToggler,
  Collapse } from 'reactstrap';

import './style.css';

function Nav(props) {
  // return (
  //   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  //     <ul className="nav nav-tabs">
  //       <li className="nav-item">
        
  //         <NavLink to="/home" className="nav-link">
  //           Home
  //         </NavLink>
  //       </li>
         // <li className="nav-item">
  //         <NavLink
  //           to="/about"
  //           className="nav-link"
  //         >
  //           About
  //         </NavLink>
  //       </li>
  //       <li className="nav-item">
  //         <NavLink
  //           to="/search"
  //           className="nav-link"
  //         >
  //           Search
  //         </NavLink>
  //       </li>
  //       <li className="nav-item">
  //         <NavLink
  //           to="/logout"
  //           className="nav-link"
  //         >
  //           Log Out
  //         </NavLink>
  //       </li>
  //     </ul>
  //   </nav>
  
  
  
  // );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [collapsed, setCollapsed]       = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  console.log (props);
  const userName = props.auth.user.name;

return(
<div> 
  <nav className="navbar navbar-expand-lg navbar-light bg-light">

  <NavLink to="/home" className="nav-link">DELIVER IT TODAY</NavLink> 
  {/* <a className="navbar-brand" href="#"></a> */}
  
  <NavbarToggler onClick={toggleNavbar} className="mr-2" />
    <Collapse isOpen={!collapsed} navbar>

  {/* <button className="navbar-toggler" type="button" data-toggle="collapse" 
    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button> */}
            
  {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}

    <ul className="navbar-nav mr-auto">

      <li className="nav-item active">
      <NavLink
        to="/about"
        className="nav-link">About Us
      </NavLink>
      </li>

      <li className="nav-item active">
      <NavLink
        to="/contact"
        className="nav-link">Contact Us
      </NavLink>
      </li>

      { props.auth.isAuthenticated  && (
      <li className="nav-item">
          <NavLink
            to="/delivery"
            className="nav-link">
            New Delivery
          </NavLink>
      </li>
      )}

      { props.auth.isAuthenticated  && (
     <li className="nav-item">
          <NavLink
            to="/deliveries"
            className="nav-link">
            Delivery List
          </NavLink>
      </li>
      )}



          <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle nav caret>
              Services
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <a href="/home/#lastMile">Last Mile Delivery</a>
              </DropdownItem>
              <DropdownItem>
                <a href="/home/#sameDayRetail">Same Day Retail</a>
              </DropdownItem>
              <DropdownItem>
                <a href="/home/#conventionServices">Convention Services</a>
              </DropdownItem>
            </DropdownMenu>
        </Dropdown>
  

      

    </ul>


     
    { props.auth.isAuthenticated  && (
    <div>
      <div id="user-name" className="small" >Logged in as: {userName}</div>
      <NavLink id="logout-link"
        to="/logout"
        className="nav-link">
        <button  id="logoutButton" className="btn btn-outline-success my-2 my-sm-0 ml-3 " type="submit">Log Out</button>
      </NavLink>
    </div>
    )
    }
 
     { !props.auth.isAuthenticated  && (
       <div>
        <NavLink id="login-link" to="/login">
          <button id="loginButton" className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
        </NavLink>
        <NavLink  id="reg-link" to="/register">
          <button  id="regButton" className="btn btn-outline-success my-2 my-sm-0" type="submit">Register</button>
        </NavLink>
        </div>)
     }

     </Collapse>

  </nav>
</div>
);

}


Nav.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Nav);