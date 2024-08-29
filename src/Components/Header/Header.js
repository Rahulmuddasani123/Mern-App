import React from 'react'
import Home from '../Home/Home.js';
import Signup from '../SignUp/Signup.js';
import Login from "../Login/Login.js";
import ContactUs from '../ContactUs/ContactUs.js';
import AboutUs from '../AboutUs/AboutUs.js';
import Cart from '../Cart/Cart.js';
import UserDashboard from '../UserDashboard/UserDashboard.js';
import AdminDashboard from '../AdminDashboard/AdminDashboard.js';
import {Routes,Link, Route,useNavigate} from 'react-router-dom'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from '../../Images/Logo.png';
import logo_symbol from '../../Images/Logo_Symbol.png'
import Wishlist from '../WishList/Wishlist.js';
import Products from '../Products/Products.js';
import './Header.css'
import {useSelector,useDispatch} from'react-redux'
import { clearLoginStatus } from '../../Slices/userSlice.js';
import { FaHeart } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { useEffect } from 'react';




function Header() {

  let {userObj,isPending,isRejected,isSuccess,errmsg} =useSelector(state=>state.user)
  let dispatch=useDispatch()
  let navigate=useNavigate()

useEffect(() => {
    // Verify if user is logged in by checking localStorage
    if (!localStorage.getItem('userObj')) {
      dispatch(clearLoginStatus());
    }
  }, [dispatch]);

  const userLogout = () => {
    localStorage.removeItem('userObj');
    dispatch(clearLoginStatus());
    navigate('/'); // Use absolute path
  };


  return (
    <div>
      <Navbar expand="lg border">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img src={Logo} width={230} className="d-none d-md-block"></img>
            <img
              src={logo_symbol}
              width={60}
              className="d-lg-none d-xs-block"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto mt-1">
              {isSuccess !== true ? (
                <>
                  <Link className="Nav-Link  active ss" to="">
                    <span>Home</span>
                  </Link>

                  <Link to="Login" className="Nav-Link  ">
                    Login
                  </Link>

                  <Link className="Nav-Link  " to="signup">
                    Signup
                  </Link>

                  <Link className="Nav-Link " to="aboutus">
                    <span>About Us</span>
                  </Link>

                  <Link className="Nav-Link " to="contactus">
                    <span>Contact Us</span>
                  </Link>
                </>
              ) : (
                <>
                  <div className="d-flex flex-row justify-content-end  ps-3 pe-3 pt-2 pb-2">
                    <button
                      onClick={() => {
                        navigate("/Wishlist");
                      }}
                      className="me-3 u-dashboard-wish-btn"
                    >
                      <FaHeart />
                    </button>
                    <button
                      onClick={() => {
                        navigate("/Cart");
                      }}
                      className="me-3 u-dashboard-cart-btn"
                    >
                      <GiShoppingBag />
                    </button>
                  </div>

                  <Link className="Nav-Link-Profile pt-2 pb-2" to="">
                    <div className="dropdown">
                      <div
                        className="m-0 dropdown-toggle d-flex align-items-center"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ cursor: "pointer" }}
                      >
                        <p className="m-0 ms-2">
                          <img
                            src={userObj.profileimage}
                            style={{ width: "30px", borderRadius: "50%" }}
                          ></img>{" "}
                          {userObj.username}
                        </p>
                      </div>
                      <ul className="dropdown-menu">
                        <li className="dropdown-item">Change Password</li>
                        <li className="dropdown-item" onClick={userLogout}>
                          Logout
                        </li>
                      </ul>
                    </div>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div></div>

      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="Login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="aboutus" element={<AboutUs />}></Route>
        <Route path="contactus" element={<ContactUs />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="Wishlist" element={<Wishlist />}></Route>
        <Route path="Products" element={<Products />}></Route>
        <Route path="UserDashboard" element={<UserDashboard />}></Route>
        <Route path="AdminDashboard" element={<AdminDashboard />}></Route>
      </Routes>
    </div>
  );
}

export default Header