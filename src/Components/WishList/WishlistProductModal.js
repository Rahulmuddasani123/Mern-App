import React from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";


function WishlistProductModal({
  product,
  handleAddToCart,
  handleRemoveFromWishlist,
}) {
  return (
    <div
      className="modal"
      id="viewWishlistProductModal"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="viewWishlistProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header inter">
            <div>
              <span className="view_product_brand_header inter">
                {product.brand}
              </span>
              <br />
              <span className="view_product_name inter">{product.title}</span>
              <br />
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row p-3">
                <div className="col-lg-5 col-xs-12">
                  <img src={product.productImage} width={300} />
                </div>
                <div className="col-lg-6 col-xs-12 p-3 pt-1 ms-3">
                  <div>
                    <div className="mt-3 mb-3">
                      <p className="product_color-header">Description :</p>
                      <span className="view_description">
                        {product.description}
                      </span>
                    </div>
                    <div className="mt-3 mb-3">
                      <p className="product_color-header inter">Color </p>
                      <span className="view_description">{product.color}</span>
                    </div>
                    <div className="mt-3 mb-3">
                      <p className="product_color-header inter">Size </p>
                      <span className="view_description">{product.size}</span>
                    </div>
                    <div>
                      <span className="view_product_price mt-3">
                        <FaIndianRupeeSign />
                        {product.price}
                      </span>
                    </div>
                    <div className="d-flex flex-row justify-content-between mt-4">
                      <button
                        className="add_to_cart_button comfortaa"
                        onClick={handleAddToCart}
                      >
                        Move to cart &nbsp; <FaCartPlus />
                      </button>
                      <button
                        className="remove_from_wishlist_button comfortaa"
                        onClick={() => handleRemoveFromWishlist(product)}
                      >
                        Remove &nbsp; <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistProductModal;
