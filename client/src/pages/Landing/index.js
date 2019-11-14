import React, { Component } from "react";
import "./style.css";
import guyImage from "./Guy_Delivering_Pkg.jpg";
import eventImage from "./Event_Services_Hall.png";
import womanImage from "./Woman_With_Lots_of_Bags.jpg";
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
<div>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">MERN BABY MERN</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" 
    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
              
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">About Us
        <span className="sr-only">(current)</span></a>
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
            <a className="dropdown-item" href="#">Service 1</a>
            <a className="dropdown-item" href="#">Service 2</a>
            <a className="dropdown-item" href="#">Service 3</a>
          </div>
        </div>
      </li>    
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav> {/* close navebar    */}
  
  <div className="jumbotron jumbotron-fluid" id="main">
    <div className="container">
      <h1 className="display-4">MERN BABY BERN</h1>
      <p className="lead">This is where we'll have our slogan / maybe "Get a quote" button and background.</p>
      <br></br><br></br>
      <div className="row">
        <div className="col-sm-7">     
        </div>
        <div className="col-sm-5 text-center" id="col-4">
          <a className="btn btn-primary btn-success" href="#" role="button">Get a Quote</a>
        </div>
      </div>    
    </div>
  </div>
  <br></br><br></br>

  <div className="container">
    <div className="row">
      <div className="col-sm">               
        <div className="card" style={{"width": "18rem;"}} >
          <a href="#"><img src={guyImage} className="card-img-top" alt="..."></img></a>
          <div className="card-body">
            <h5 className="card-title">Last Mile Delivery </h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      
      <div className="col-sm">
        <div className="card" style={{"width": "18 rem"}}>
          <a href="#"><img src={womanImage} className="card-img-top" alt="..."></img></a>
          <div className="card-body">
            <h5 className="card-title">Same Day Retail</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      
      <div className="col-sm">
        <div className="card" style={{"width": "18rem;"}}>
          <a href="#"><img src={eventImage} className="card-img-top" alt="..."></img></a>
          <div className="card-body">
            <h5 className="card-title">Convention Services</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>);
  }
}
export default Landing;