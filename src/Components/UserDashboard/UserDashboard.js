import Products from "../Products/Products";
import Filter from "../Products/Filter";
import {useNavigate} from 'react-router'
import './UserDashboard.css'
import { FaHeart } from "react-icons/fa6";
import { GiShoppingBag } from 'react-icons/gi';


function UserDashboard() {

 let navigate=useNavigate()

  return (
    <>
      <div className=" m-3">
        <h1 className="bebas Products_title">PRODUCTS</h1>
      </div>

      {/* <div className="d-flex flex-row justify-content-end  ps-3 pe-3 pt-2 pb-2">
      <button onClick={()=>{navigate('/Wishlist')}} className="me-3 u-dashboard-wish-btn"><FaHeart/></button>
       <button onClick={()=>{navigate('/Cart')}} className="me-3 u-dashboard-cart-btn"><GiShoppingBag/></button>
    </div> */}
      <div>
       

        <Products />
      </div>
    </>
  );
}

export default UserDashboard;
