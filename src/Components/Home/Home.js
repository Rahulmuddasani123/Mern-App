import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './Home.css'
import AboutUs from '../AboutUs/AboutUs';
import ContactUs from '../ContactUs/ContactUs';
import man from "../../Images/man.png";
import logo_symbol from "../../Images/Logo_Symbol.png";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

function Home() {
   
  return (
    <div>
      <Container fluid>
        <Row className="mb-3">
          <Col
            className="text-center d-flex flex-column justify-content-center"
            lg={8}
            xs={12}
          >
            <div className="image-container">
              <img src={logo_symbol} width={130} />

              <h1 className="Banner-main-header">
                {" "}
                Browse Rivv Rivv's Latest Trends!
              </h1>
              <h3 className="Banner-sub-header">
                {" "}
                Your Fashion Journey Starts Here
              </h3>
            </div>
            <div>
              <button className="banner-shop-now-button ">
                SHOP NOW <FaRegArrowAltCircleRight className="fs-5 ms-2 mb-1" />
              </button>
            </div>
          </Col>

          <Col className="d-none d-lg-block" lg={4} xs={12}>
            <div>
              <img src={man} width={400} />
            </div>
          </Col>
        </Row>
      </Container>

       <AboutUs/>
       <ContactUs/>

     
    </div>
  );
}

export default Home