import React, { useState } from 'react';
import { Link, NavLink  } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu,DropdownItem, Button } from 'reactstrap'
import './style.css';

function Nav() {
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
  const toggle = () => setDropdownOpen(!dropdownOpen);

return(
<div> 
  <nav className="navbar navbar-expand-lg navbar-light bg-light">

  <NavLink to="/home" className="nav-link">
        DELIVER IT TODAY
    </NavLink> 
  {/* <a className="navbar-brand" href="#"></a> */}
  
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" 
    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
            
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
      <NavLink
        to="/about"
        className="nav-link">About Us
      </NavLink>
        {/* <a className="nav-link" href="about2.html">About Us */}
          {/* </a> */}

    {/* <span className="sr-only">(current)</span> */}
      </li>

      <li className="nav-item">
        <a className="nav-link" href="#">Contact Us</a>
      </li>

      <li className="nav-item">
          <NavLink
            to="/delivery"
            className="nav-link">
            New Delivery
          </NavLink>
      </li>
     <li className="nav-item">
          <NavLink
            to="/deliveries"
            className="nav-link">
            Delivery List
          </NavLink>
      </li>


        <li>
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
        </li>

        <li className="nav-item">
          <NavLink
            to="/logout"
            className="nav-link">
            Log Out
          </NavLink>
      </li>

    </ul>
 
  
        <NavLink id="login-link" to="/login">
          <button id="loginButton" className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
        </NavLink>
        <NavLink to="/register">
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Register</button>
        </NavLink>

  </div>
</nav>

</div>
);

}
export default Nav;