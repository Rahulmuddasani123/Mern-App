import React from "react";
import { GoHeart } from "react-icons/go";
import { useNavigate } from "react-router";

function WishlistButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/Wishlist")}
      className="cart-wishlist-button"
    >
      <span className="d-none d-lg-block">
        {" "}
        wishlist <GoHeart className="fs-5" />{" "}
      </span>
      <span className="d-lg-none d-xs-block">
        {" "}
        <GoHeart className="fs-5" />{" "}
      </span>
    </button>
  );
}

export default WishlistButton;
