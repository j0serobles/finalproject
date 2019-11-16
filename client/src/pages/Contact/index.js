import React from "react";
import './style.css';



class Contact extends React.Component {

    render() {
        return(
 <div>
    <div className="jumbotron text-center" id="jumbo">
      <h1>DELIVER it TODAY</h1>
        <p>We specialize in Same Day Delivery</p>
        <p>Delivering your goods where you need it and when you need it</p>
      </div>
 <div className="container">
   <div className="col-8">
     <div className="row justify-content-md-center">
       <form action="/action_page.php">
         <label for="fname">First Name</label>
         <input type="text" id="fname" name="firstname" placeholder="Your name.." />
         <label for="lname">Last Name</label>
         <input type="text" id="lname" name="lastname" placeholder="Your last name.." />
         <label for="eMail">Email Address</label>
         <input type="text" id="eMail" name="email" placeholder="Your email address.." />
         <label for="subject">Subject</label>
         <textarea id="subject" name="subject" placeholder="Write your message here.." style={{"height":"200px"}}></textarea>
         <input type="submit" value="Submit"/>
       </form>
     </div>
   </div>
 </div>
 </div>);
  
 }

}

export default Contact;