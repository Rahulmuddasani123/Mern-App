import React, { useState } from "react";
import { FaCartPlus, FaIndianRupeeSign } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { addtocart, updatecartitem } from "../../Slices/cartSlice";
import { addtowishlist } from "../../Slices/wishlistSlice";
import { toast } from "react-toastify";

function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (selectedColor !== "" && selectedSize !== "") {
      const finalProduct = {
        ...product,
        size: selectedSize,
        color: selectedColor,
        quantity: selectedQuantity,
      };

      dispatch(addtocart(finalProduct));
      dispatch(updatecartitem(finalProduct));

      toast.success("Product added to cart!", {
        position: "top-center",
        autoClose: 1000,
      });

      onClose(); // Close the modal after adding to cart
    } else {
      toast.error("Please select a size and color!", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  const handleAddToWishlist = async () => {
    if (selectedColor !== "" && selectedSize !== "") {
      const finalProduct = {
        ...product,
        size: selectedSize,
        color: selectedColor,
        quantity: selectedQuantity,
      };

      await dispatch(addtowishlist(finalProduct));

      toast.success("Product added to wishlist!", {
        position: "top-center",
        autoClose: 1000,
      });

      onClose(); // Close the modal after adding to wishlist
    } else {
      toast.error("Please select a size and color!", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <div
      className="modal fade"
      id="viewProductModal"
      tabIndex="-1"
      aria-labelledby="viewProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <span className="view_product_brand_header">{product.brand}</span>
              <br />
              <span className="view_product_name">{product.title}</span>
              <br />
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row p-3">
                <div className="col-lg-5 col-xs-12">
                  <img
                    src={product.productImage}
                    width={300}
                    alt={product.title}
                  />
                </div>
                <div className="col-lg-7 col-xs-12 p-3 pt-1">
                  <div>
                    <div className="mt-3 mb-3">
                      <p className="product_color-header">Description:</p>
                      <span className="view_description">
                        {product.description}
                      </span>
                    </div>
                    <div className="d-flex flex-row justify-content-between mb-3">
                      <div>
                        <p className="product_color-header">Size</p>
                        <select
                          className="form-select form-select-sm"
                          style={{ color: "#1F316F" }}
                          value={selectedSize}
                          onChange={(e) => setSelectedSize(e.target.value)}
                        >
                          <option value="">Select</option>
                          {product.size && product.size.length > 0 ? (
                            product.size.map((size, index) => (
                              <option key={index} value={size}>
                                {size}
                              </option>
                            ))
                          ) : (
                            <option disabled>No sizes available</option>
                          )}
                        </select>
                      </div>
                      <div>
                        <p className="product_color-header">Color</p>
                        <select
                          className="form-select form-select-sm"
                          style={{ color: "#1F316F" }}
                          value={selectedColor}
                          onChange={(e) => setSelectedColor(e.target.value)}
                        >
                          <option value="">Select</option>
                          {product.color && product.color.length > 0 ? (
                            product.color.map((color, index) => (
                              <option key={index} value={color}>
                                {color}
                              </option>
                            ))
                          ) : (
                            <option disabled>No colors available</option>
                          )}
                        </select>
                      </div>
                      <div>
                        <p className="product_color-header">Quantity</p>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          style={{ color: "#1F316F" }}
                          value={selectedQuantity}
                          onChange={(e) => setSelectedQuantity(e.target.value)}
                          min="1"
                        />
                      </div>
                    </div>
                    <div className="product_info mt-3">
                      <span className="product_price">
                        <FaIndianRupeeSign /> {product.price}
                      </span>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddToCart}
            >
              <FaCartPlus /> Add to Cart
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddToWishlist}
            >
              <CiHeart /> Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
