import React from "react";
import { GoHeart } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";


function CartItem({
  cartItem,
  findProductData,
  handleEditProduct,
  handleRemoveFromCart,
  handleAddToWishlist,
}) {
  const productData = findProductData(cartItem._id);

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="cart-container rounded shadow-lg border">
        <div className="cart-actions d-flex flex-row">
          <span
            type="button"
            className="view_product_butto"
            data-bs-toggle="modal"
            data-bs-target="#editProductModal"
            onClick={() => handleEditProduct()}
          >
            <FaEdit className="edit-icon" />
          </span>
          <span className="cart-wishlist-icon" onClick={handleAddToWishlist}>
            <GoHeart className="fs-5" />
          </span>
          <p className="cart-remove-icon" onClick={handleRemoveFromCart}>
            <RiDeleteBin6Line className="text-danger" />
          </p>
        </div>
        <div className="d-flex flex-row">
          <div className="p-1">
            <img
              src={cartItem.productImage}
              alt={cartItem.title}
              style={{ width: "110px", height: "133px" }}
            />
          </div>
          <div className="p-2 ms-1 inter">
            <span className="brand-header">{cartItem.brand}</span>
            <br />
            <span className="brand-content p-0 m-0">{cartItem.title}</span>
            <br />
            <p className="m-0 p-0 ">
              <span className="product-subheaders">Color &nbsp; :</span>
              &nbsp;
              <span className="subheaders-value">{cartItem.color}</span>
            </p>
            <p className="m-0 p-0 ">
              <span className="product-subheaders">Size &nbsp; :</span>
              &nbsp;
              <span className="subheaders-value">{cartItem.size}</span>
            </p>
            <p className="m-0 p-0 ">
              <span className="product-subheaders">Quantity &nbsp; :</span>
              &nbsp;
              <span className="subheaders-value">{cartItem.quantity}</span>
            </p>
            <hr />
            <p>
              <span className="rupees-label">
                <FaIndianRupeeSign /> {cartItem.price} x
              </span>
              <span className="quantity-label"> {cartItem.quantity}</span> =
              <span className="price-label">
                <FaIndianRupeeSign />
                {parseFloat(cartItem.price) * parseFloat(cartItem.quantity)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
