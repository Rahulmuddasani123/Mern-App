import React from 'react'
import VisitUslogo from "../../Images/visitus.png";
import contactUslogo from "../../Images/Contact_us_Logo.png";
import './ContactUs.css'
import { IoMailOpenOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

function ContactUs() {
  return (
    <div>
      <div className="container ">
        <div className="row mt-4">
          <div className="col-lg-6 col-xs-12 text-center">
            <h4 className="contactus-header d-lg-none d-xs-block">CONTACT US</h4>
            <img src={contactUslogo} style={{ width: "100%" }}></img>
          </div>

          <div className="col-lg-6 text-center p-3">
            <h4 className="contactus-header d-none d-lg-block">CONTACT US</h4>
            <p className="contactus-description">
              At Rivv Rivv, we believe in offering our customers the best
              service possible. Whether you have a question about your order,
              need assistance with a product, or just want to share feedback,
              our team is ready to assist you.
            </p>
            <h1 className="contactus-details">
              <span>
                <IoMailOpenOutline className="fs-3" />
              </span>{" "}
              &nbsp; support@rivvrivv.com
            </h1>
            <h1 className="contactus-details">
              <span>
                <FaPhoneAlt className="fs-5" />
              </span>{" "}
              &nbsp;  &nbsp; +1-800-123-4567
            </h1>
            <h4 className="availability-text">
              Available Monday to Friday, 9 AM to 6 PM
            </h4>
          </div>
        </div>
        <div className="row  p-3 mt-5 text-center">

          <div className="map  d-lg-none d-xs-block">
            <h1 className="visitus-header d-lg-none d-xs-block">VISIT STORE</h1>
              <img src={VisitUslogo} style={{ width: "100%" }}></img>
            </div>
          <div className="col-lg-6 col-xs-12">
            <div className="map">
              <h1 className="visitus-header d-none d-lg-block">VISIT STORE</h1>
              <h1></h1>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.007019484587!2d-122.40003248467985!3d37.78329097975637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808e6a7bba0b%3A0x6211b33904cbf839!2s123%20Fashion%20St%2C%20Style%20City%2C%20SC%2012345!5e0!3m2!1sen!2sus!4v1610616161616"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="col-lg-6 col-xs-12 d-none d-lg-block">
            <div className="map">
              <img src={VisitUslogo} style={{ width: "100%" }}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs