import React, { Component } from "react";
import "./style.css";
import guyImage from "./Guy_Delivering_Pkg.jpg";
import eventImage from "./Event_Services_Hall.png";
import womanImage from "./Woman_With_Lots_of_Bags.jpg";

class Landing extends Component {
  render() {
    return (
  <div>
    <div id="main">
    <div className="container" id="splash"></div>
      <div className="row">
        <div className="col-sm-4 offset-sm-7 text-center" id="col-4">
          <a className="btn btn-primary btn-success btn-block btn-lg mt-3" id="quote-btn" href="/delivery" role="button">Get a Quote</a>
        </div>
      </div>
      </div>    

  <div className="container">
    <div className="row">
      <div className="col-sm">               
        <div className="card" style={{"width": "18rem"}} >
          <a href="#"><img src={guyImage} className="card-img-top img-fluid" alt="..."></img></a>
          <div className="card-body">
            <h5 className="card-title" id="lastMile">Last Mile Delivery </h5>
            <p className="card-text">Our Last Mile Delivery service takes away your stress of dealing with excuses and failed attempts by other companies.  We’ll pick up your shipment anywhere in the Central Florida market and have to you in time and on time. No excuses and no more stress!</p>
            <a href="/delivery" className="btn btn-primary">Get a Quote</a>
          </div>
        </div>
      </div>
      
      <div className="col-sm">
        <div className="card" style={{"width": "18 rem"}}>
          <a href="#"><img src={womanImage} className="card-img-top img-fluid" alt="..."></img></a>
          <div className="card-body">
            <h5 className="card-title" id="sameDayRetail">Same Day Retail</h5>
                          <p className="card-text">When you’re busy shopping at the mall or online at your favorite store and have something you need delivered to your hotel, your agent at the airport or simply to a friend or family member. We’ll pick it up at the retail store and deliver it no questions asked. We’ll get it to where you need it! </p>
            <p className="card-text"></p>
            <a href="/delivery" className="btn btn-primary">Get a Quote</a>
          </div>
        </div>
      </div>
      
      <div className="col-sm">
        <div className="card" style={{"width": "18rem"}}>
          <a href="#"><img src={eventImage} className="card-img-top img-fluid" alt="..."></img></a>
          <div className="card-body">
            <h5 className="card-title" id="conventionServices">Convention Services</h5>
            <p className="card-text">Our Brand New “Convention Services” delivery can save the day. When you need that special item or missing piece of your booth, marketing materials, or whatever is needed to save your tradeshow - you can count on us to save the day. We know the business, the locations and how to get in and out in no time flat! </p>
            <a href="/delivery" className="btn btn-primary">Get a Quote</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>);  
  }
}
export default Landing;