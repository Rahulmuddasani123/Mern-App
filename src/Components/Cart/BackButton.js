import React from "react";
import { IoChevronBackSharp } from "react-icons/io5";

function BackButton({ navigate }) {
  return (
    <button
      onClick={() => navigate("/UserDashboard")}
      className="wishlist-back-button"
    >
      <span className="d-none d-lg-block">
        {" "}
        <IoChevronBackSharp /> Back{" "}
      </span>
      <span className="d-lg-none d-xs-block">
        {" "}
        <IoChevronBackSharp />{" "}
      </span>
    </button>
  );
}

export default BackButton;
