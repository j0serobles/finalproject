import React from "react";
import { Link, NavLink} from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink to="/home" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/delivery"
            className="nav-link">
            Deliveries
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/about"
            className="nav-link"
          >
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/search"
            className="nav-link"
          >
            Search
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/logout"
            className="nav-link"
          >
            Log Out
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;