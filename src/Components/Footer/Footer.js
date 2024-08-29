import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import './Footer.css'
import { SlSocialFacebook, SlSocialGithub,SlSocialInstagram,SlSocialLinkedin ,SlSocialYoutube,} from "react-icons/sl";
import { LuSendHorizonal } from "react-icons/lu";
import { FaRegCopyright } from "react-icons/fa";

function Footer() {
  return (
    <div>

         <Container fluid className="footer">
            <Row className="footer-icon-container">
              <Col>
                <div>
                  <span className="footer-follow-text">FOLLOW US</span>
                </div>

                <div>
                  <SlSocialInstagram className="footer-icon" />
                  <SlSocialFacebook className="footer-icon" />
                  <SlSocialGithub className="footer-icon" />
                  <SlSocialLinkedin className="footer-icon" />
                  <SlSocialYoutube className="footer-icon" />
                </div>
              </Col>
            </Row>

            <Row className="pt-4 pb-4 ps-3 pe-3">
              <Col xs={12} lg={4} className="mt-3">
                <div>
                  <h4 className="footer-main-header">ABOUT US</h4>

                  <p className="footer-main-description">
                    At Rivv Rivv, we believe that fashion is more than just
                    clothing,it's a way to express yourself. Our mission is to bring
                    you the latest trends and timeless styles, all while staying
                    committed to quality .
                  </p>
                </div>
              </Col>
              <Col xs={6} lg={2} className="mt-3">
                <div>
                  <h4 className="footer-main-header">SHOP</h4>

                  <h5 className="footer-main-link">Mens Collection</h5>
                  <h5 className="footer-main-link">Womens Collection </h5>

                  <h5 className="footer-main-link">Kids Collection</h5>
                  <h5 className="footer-main-link">New Arrivals </h5>
                </div>
              </Col>

              <Col xs={6} lg={2} className="mt-3">
                <div>
                  <h4 className="footer-main-header">HELP</h4>

                  <h5 className="footer-main-link"></h5>
                  <h5 className="footer-main-link">FAQ's </h5>

                  <h5 className="footer-main-link">Customer Support</h5>
                </div>
              </Col>

              <Col xs={12} lg={4} className="mt-3">
                <div>
                  <h4 className="footer-main-header">GET IN TOUCH</h4>

                  <Form className="text-center">
              
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Control
                        type="email"
                        placeholder="Email Id"
                        className="form-control form-control-sm footer-input"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 " controlId="formGroupPassword">
                      <button className="footer-submit-button">
                        SUBMIT
                      </button>
                    </Form.Group>
                  </Form>
                </div>
              </Col>
            </Row>

          <Row className="copyright-footer ">
            <Col>
              <span className="copyright-text">
                <FaRegCopyright /> 2024 Rivv Rivv. All Rights Reserved
              </span>
            </Col>
          </Row>
      </Container>
    </div>
  )
}

export default Footer