import React, { Component } from "react";
import { Link } from "react-router-dom";
import  {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Button
} from 'reactstrap';

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container">
        <div className="row">
          <div className="col-12">
            <h1>MERN BABY MERN!</h1>
              <h4 className="flow-text grey-text text-darken-1">
                Get anything delivered anywhere fast!
              </h4>
           <p>
             Built with the{" "}
             <span style={{ fontFamily: "monospace" }}>MERN</span> stack.
           </p>
            <br />
          </div>
        </div>

        <div className="row">

            <div className="col-6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-primary btn-lg"
                role="button"
              >
                Register
              </Link>
            </div>
            <div className="col-6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-primary btn-lg"
                role="button"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
    );
  }
}
export default Landing;