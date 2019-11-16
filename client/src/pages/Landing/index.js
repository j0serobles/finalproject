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
            <p className="card-text">Our Last Mile Delivery service takes away your stress of dealing with excuses and failed attempts by other companies.  We’ll pick up your shipment anywhere in the Central Florida market and have to you in time and on time. No excuses and no more stress!</p>
            <a href="#" className="btn btn-primary">Get a Quote</a>
          </div>
        </div>
      </div>
      
      <div className="col-sm">
        <div className="card" style={{"width": "18 rem"}}>
          <a href="#"><img src={womanImage} className="card-img-top" alt="..."></img></a>
          <div className="card-body">
            <h5 className="card-title">Same Day Retail</h5>
                          <p class="card-text">When you’re busy shopping at the mall or online at your favorite store and have something you need delivered to your hotel, your agent at the airport or simply to a friend or family member. We’ll pick it up at the retail store and deliver it no questions asked. We’ll get it to where you need it! </p>
            <p className="card-text"></p>
            <a href="#" className="btn btn-primary">Get a Quote</a>
          </div>
        </div>
      </div>
      
      <div className="col-sm">
        <div className="card" style={{"width": "18rem;"}}>
          <a href="#"><img src={eventImage} className="card-img-top" alt="..."></img></a>
          <div className="card-body">
            <h5 className="card-title">Convention Services</h5>
            <p className="card-text">Our Brand New “Convention Services” delivery can save the day. When you need that special item or missing piece of your booth, marketing materials, or whatever is needed to save your tradeshow - you can count on us to save the day. We know the business, the locations and how to get in and out in no time flat! </p>
            <a href="#" className="btn btn-primary">Get a Quote</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>);  
  }
}
export default Landing;