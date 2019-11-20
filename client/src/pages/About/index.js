import React from "react";
import "./style.css"; 

class About extends React.Component {

    render() {
        return(
        <div className="container">

<div className="jumbotron text-center" id="jumbo-about">
                <h1>Deliver It Today</h1> 
                <p>We specialize in Same Day Delivery</p>
                <p>Delivering your goods where you need it and when you need it</p> 
                <form className="form-inline">
                  <div className="input-group">
                    
                    
                  </div>
                </form>
               </div>  {/* close Jumbotron  */}

              <div className="container-fluid">
                <div className= "text-center">   
                    <div className="container-fluid bg-grey">
                    <h2>Our Values</h2>
                      <h4><strong>MISSION:</strong>To ensure your satisfaction the first time and every time</h4>
                      <p><strong>VISION:</strong>To add value and service above all else.</p>
                    </div>    
                    <br></br>
                    {/* <button className="btn btn-default btn-lg">Get in Touch</button> */}
                </div>
              </div> 

                  <h2 id="headerReviews">What our customers say</h2>
                  <div id="myCarousel" className="carousel slide text-center" data-ride="carousel">
                    <ol className="carousel-indicators">
                      <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                      <li data-target="#myCarousel" data-slide-to="1"></li>
                      <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>
                  
                    <div className="carousel-inner" role="listbox">
                      <div className="item active">
                      <h4>"This company is the best. I am so happy with the result!"<br></br><span style={{"font-style":"normal"}}>Michael Roe, Vice President, Comment Box</span></h4>
                      </div>
                      <div className="item">
                        <h4>"One word... WOW!!"<br></br><span style={{"font-style":"normal"}}>John Doe, Salesman, Rep Inc</span></h4>
                      </div>
                      <div className="item">
                        <h4>"Could I... BE any more happy with this company?"<br></br><br></br><span style={{"font-style":"normal"}}>Chandler Bing, Actor, FriendsAlot</span></h4>
                      </div>
                    </div>
                  
             
                    <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                 

</div>)

    }
}
 
export default About;