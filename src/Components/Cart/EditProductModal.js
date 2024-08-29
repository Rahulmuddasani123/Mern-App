import React from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoCheckmarkDone } from "react-icons/io5";


function EditProductModal({
  editedProduct,
  editedSize,
  setEditedSize,
  editedColor,
  setEditedColor,
  editedQuantity,
  setEditedQuantity,
  handleEditProduct,
}) {
  return (
    <div
      className="modal fade"
      id="editProductModal"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="editProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <span className="view_product_brand_header">
                {editedProduct.brand}
              </span>
              <br />
              <span className="view_product_name">{editedProduct.title}</span>
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
              <div className="row p-1">
                <div className="col-lg-5 col-xs-12">
                  <img
                    src={editedProduct.productImage}
                    width={300}
                    alt={editedProduct.title}
                  />
                </div>
                <div className="col-lg-7 col-xs-12 p-3 pt-1">
                  <div>
                    <div className="mt-3 mb-3">
                      <p className="product_color-header">Description:</p>
                      <span className="view_description">
                        {editedProduct.description}
                      </span>
                    </div>

                    <div className="d-flex flex-row justify-content-between mb-3">
                      {/* Size selection */}
                      <div>
                        <p className="product_color-header">Size</p>
                        <select
                          className="form-select form-select-sm"
                          style={{ color: "#1F316F" }}
                          value={editedSize}
                          onChange={(e) => setEditedSize(e.target.value)}
                        >
                          <option value="">Select</option>
                          {Array.isArray(editedProduct.size) &&
                          editedProduct.size.length > 0 ? (
                            editedProduct.size.map((size, index) => (
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
                          value={editedColor}
                          onChange={(e) => setEditedColor(e.target.value)}
                        >
                          <option value="">Select</option>
                          {Array.isArray(editedProduct.color) &&
                          editedProduct.color.length > 0 ? (
                            editedProduct.color.map((color, index) => (
                              <option key={index} value={color}>
                                {color}
                              </option>
                            ))
                          ) : (
                            <option disabled>No colors available</option>
                          )}
                        </select>
                      </div>
                      {/* Quantity input */}
                      <div>
                        <p className="product_color-header">Quantity</p>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          style={{ color: "#1F316F" }}
                          value={editedQuantity}
                          onChange={(e) =>
                            setEditedQuantity(parseInt(e.target.value, 10))
                          }
                          min="1"
                        />
                      </div>
                    </div>
                    <div>
                      <span className="view_product_price mt-3">
                        <FaIndianRupeeSign />
                        {editedProduct.price}
                      </span>
                    </div>
                    <div className="d-flex flex-row justify-content-between mt-4">
                      <button
                        className="addtocart_button"
                        onClick={handleEditProduct}
                      >
                        Save &nbsp; <IoCheckmarkDone />
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

export default EditProductModal;
