import React from "react";
import {FaCartPlus } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RxArrowRight } from "react-icons/rx";

function ProductCard({ product, onSelectProduct }) {
  return (
    <div className="col-lg-3 col-md-6 col-sm-12" style={{ height: "300px;" }}>
      <div className="products-container rounded shadow-lg border">
        <div className="product-image m-auto">
          <img
            src={product.productImage}
            alt={product.title}
            style={{ width: "100%" }}
          />
        </div>
        <div className="product-info ms-3">
          <span className="brand-header">{product.brand}</span>
          <br />
          <span className="brand-content">{product.title}</span>
          <br />
          <span className="brand-header">
            <FaIndianRupeeSign />
            {product.price}
          </span>
        </div>
        <div className="p-3 d-flex flex-row justify-content-between">
          <button
            type="button"
            className="view_product_button"
            data-bs-toggle="modal"
            data-bs-target="#viewProductModal"
            onClick={() => onSelectProduct(product)}
          >
            View <span className="">Product</span> <RxArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
