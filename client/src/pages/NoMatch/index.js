import React from "react";
import './css/style.css';

function NoMatch() {
  return (

<div>
  
    <div className="error-header"> 
  </div> 
  
  <div className="container "> 
   <section className="error-container text-center"> 
    <h1>404</h1> 
    <div className="error-divider"> 
     <h2>PAGE NOT FOUND.</h2> 
     <p className="description">We Couldn't Find This Page</p> 
    </div> 
    <a href="#index.html" className="return-btn"><i className="fa fa-home"></i> Home</a> 
   </section> 
  </div>
   
</div>);
}

export default NoMatch;