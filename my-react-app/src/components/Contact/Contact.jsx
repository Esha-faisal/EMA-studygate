import React from 'react'
import { Link } from "react-router-dom";
import "./Contact.css";
import msgicon from '../../components/assets/msgicon.png';
import locationicon from '../../components/assets/locationicon.png';
import mailicon from '../../components/assets/mailicon.png';
import phoneicon from '../../components/assets/phoneicon.png';
import whitearrow from '../../components/assets/whitearrow.png';

const Contact = () => {
  return (
   <section className="contact">
        <div> <h3>Contact Us</h3></div>
        <div> <h1>Get in touch</h1></div>
        <div className="contact-container">
          <div className="contact-col">
            <h3>Send us a message <img src={msgicon} alt="msgicon" /></h3>
            <p> Feel free to reach us through contact form or find our contact 
              information below.Your feedback, questions, and suggestions are 
              important to us as we strive to provide exceptional service to our
               university community.</p>
               <ul>
                <li><img src={mailicon} alt="mailicon" />areebawaqar912@gmail.com</li>
                <li><img src={phoneicon} alt="phoneicon" /> +92 332-8989765</li>
                <li><img src={locationicon} alt="locationicon" />Jhelum, PAKISTAN</li>
               </ul>
               </div>
          <div className="contact-col">
            <form>
              <label>Your name</label>
              <input type="text" name='name' placeholder='Enter your name' required/>
              <label>Phone number</label>
              <input type="tel" name='phone' placeholder='Enter your Phone no' required/>
              <label>Write Your message here</label>
              <textarea name="message" rows="6" placeholder='Enter your message' required></textarea>
              <button type='submit' className='btn'>Submit now <img src={whitearrow} alt="whittearrow" /></button>

            </form>
            <span></span>
          </div>

        </div>

      </section>
  )
}

export default Contact