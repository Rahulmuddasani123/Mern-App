import React from "react";
import { RxArrowRight } from "react-icons/rx";
import { FaIndianRupeeSign } from "react-icons/fa6";

function WishlistItem({ product, setSelectedWishlistProduct }) {
  return (
    <div
      className="col-lg-3 col-md-6 col-sm-12"
      style={{ height: "300px;" }}
      key={product._id}
    >
      <div className="products-container rounded shadow-lg border p-0  ">
        <div className="product-image m-auto  ">
          <img
            src={product.productImage}
            alt={product.title}
            style={{ width: "100%" }}
          />
        </div>

        <div className="product-info mt-2 mb-1 ms-3 ">
          <span className="brand-header m-0">{product.brand}</span>
          <br />
          <span className="brand-content m-0">{product.title}</span>
          <br />
          <span className="brand-price">
            {" "}
            <FaIndianRupeeSign />
            {product.price}
          </span>
        </div>

        <div className="p-3 d-flex flex-row justify-content-between">
          <button
            type="button"
            className="view_product_button"
            data-bs-toggle="modal"
            data-bs-target="#viewWishlistProductModal"
            onClick={() => setSelectedWishlistProduct(product)}
          >
            View <span className="">Product</span> <RxArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WishlistItem;
