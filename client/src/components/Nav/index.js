import React from "react";
import { Link, NavLink} from "react-router-dom";

function Nav() {
  // return (
  //   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  //     <ul className="nav nav-tabs">
  //       <li className="nav-item">
        
  //         <NavLink to="/home" className="nav-link">
  //           Home
  //         </NavLink>
        
        
        
  //       </li>
  //       <li className="nav-item">
  //         <NavLink
  //           to="/delivery"
  //           className="nav-link">
  //           New Delivery
  //         </NavLink>
  //       </li>
  //       <li className="nav-item">
  //         <NavLink
  //           to="/deliveries"
  //           className="nav-link">
  //           Delivery List
  //         </NavLink>
  //       </li>
  //       <li className="nav-item">
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
      <li className="nav-item dropdown">
        
      <div className="dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Services
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#lastMile">Service 1</a>
          <a className="dropdown-item" href="#">Service 2</a>
          <a className="dropdown-item" href="#">Service 3</a>
        </div>
      </div>
    </li>     
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
         Search</button>
    </form>
  </div>
</nav>

</div>
);

}
export default Nav;