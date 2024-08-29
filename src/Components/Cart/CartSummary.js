import React from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";


function CartSummary({ cart, totalPrice, discount, finalAmount, navigate }) {
  return (
    <div className="rounded shadow-lg p-3">
      <h1 className="cart-title">Summary</h1>
      <hr />
      <div className="summary-table">
        <div className="summary-row">
          <span className="summary-label">No. of Items:</span>
          <span className="summary-no-of-items-value">{cart.length}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Price:</span>
          <span className="summary-price-value">
            <FaIndianRupeeSign /> {totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Discount:</span>
          <span className="summary-discount-value">
            <FaIndianRupeeSign /> {discount.toFixed(2)}
          </span>
        </div>
        <hr />
        <div className="summary-row">
          <span className="summary-label">Final Amount:</span>
          <span className="summary-final-amount-value">
            <FaIndianRupeeSign /> {finalAmount.toFixed(2)}
          </span>
        </div>
      </div>
      <hr />
      <div>
        <button
          className="btn btn-warning w-100"
          onClick={() => navigate("/Checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
