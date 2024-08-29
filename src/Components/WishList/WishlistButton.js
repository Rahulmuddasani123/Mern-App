import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router";

function WishlistButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/Cart")}
      className="wishlist-cart-button inter"
    >
      <span className="d-none d-lg-block">
        Cart <FaCartPlus />
      </span>
      <span className="d-lg-none d-xs-block">
        <FaCartPlus />
      </span>
    </button>
  );
}

export default WishlistButton;
