import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './AdminDashboard.css'; // Import the CSS file for styling
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../Slices/productSlice';
import Count_Details from './Count_Details';
import Users_details from './Users_details';


function AdminDashboard() {

  const categories = [
    { value: '', label: 'Select Category' },
    { value: 'shirt', label: 'shirt' },
    { value: 'pant', label: 'pant' },
    { value: 'short', label: 'short' },
    { value: 'tshirt', label: 'tshirt' },
  ];


const handleDelete = async (product) => {
    try {
        console.log("Deleting product with ID:", product._id); // Debug log
        const response = await dispatch(deleteProduct(product._id));
        console.log("Delete response:", response); // Debug log

        if (response.payload.message === "Product removed successfully") {
            console.log("Product deleted successfully from the database.");
            dispatch(fetchProducts()); // Refresh the product list
        } else {
            console.log("Product not found in the database.");
        }
    } catch (error) {
        console.log("Error deleting product:", error);
    }
};


    const [ProductImg, setProductImg] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleChange = (event) => {
        let image = event.target.files[0];
        setProductImg(image);
    };

    const { products, status, error } = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const onFormSubmit = (productObj) => {
        let formData = new FormData();
        formData.append('productObj', JSON.stringify(productObj));
        formData.append('ProductImage', ProductImg);

        axios.post('/products/createProduct', formData)
            .then(response => {
                let msg = response.data.message;
                if (msg === 'Product created successfully') {
                    toast.success("Product Added", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                } else if (msg === "Error Occurred") {
                    toast.error("Something Went Wrong!", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                }
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(error => console.error('Error adding product:', error));
    };

    return (
      <div>
        <div>
          <h1 className="Admin-Main-Header">ADMIN DASHBOARD</h1>
        </div>

        <div>
          {/* <Count_Details /> */}
          <Users_details />
        </div>

        <div className="container-fluid ">
          <div className="row">
            <div className="col-12">
              <div className="card m-3">
                <div className="card-header d-flex flex-row justify-content-between">
                  <div>
                    <h1 className="form-title">ALL PRODUCTS</h1>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="Add-Products-button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
                <div className="body p-3 inter m-2">
                  <div className="table-responsive">
                    <table className="table table-bordered m-4">
                      <thead>
                        <tr>
                          <th>ProductId</th>
                          <th>Image</th>
                          <th>Brand</th>
                          <th>Title</th>
                          <th>Price</th>
                          <th>Description</th>
                          <th>Category</th>
                          <th>Colors</th>
                          <th>Sizes</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product._id}>
                            <td className="p-2" style={{ minWidth: "300px" }}>
                              {product._id}
                            </td>
                            <td className="p-2" style={{ minWidth: "150px" }}>
                              <img src={product.productImage} width={80} />
                            </td>
                            <td className="p-2" style={{ minWidth: "200px" }}>
                              {product.brand}
                            </td>
                            <td className="p-2" style={{ minWidth: "200px" }}>
                              {product.title}
                            </td>
                            <td className="p-2" style={{ minWidth: "100px" }}>
                              {product.price}
                            </td>
                            <td className="p-2" style={{ minWidth: "100px" }}>
                              {product.category}
                            </td>
                            <td className="p-2" style={{ minWidth: "300px" }}>
                              {product.description}
                            </td>
                            <td className="p-2" style={{ minWidth: "200px" }}>
                              {Array.isArray(product.color) &&
                              product.color.length > 0
                                ? product.color.join(", ")
                                : "N/A"}
                            </td>

                            <td className="p-2" style={{ minWidth: "200px" }}>
                              {Array.isArray(product.size) &&
                              product.size.length > 0
                                ? product.size.join(", ")
                                : "N/A"}
                            </td>

                            <td className="p-2" style={{ minWidth: "100px" }}>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(product)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Adding Product */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Add New Product
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={handleSubmit(onFormSubmit)}
                  className="product-form"
                >
                  <div className="row">
                    <div className="col-lg-4 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="brand">Product Brand</label>
                        <input
                          id="brand"
                          type="text"
                          name="brand"
                          {...register("brand", { required: true })}
                          className="form-control form-control-sm"
                        />
                        {errors.brand?.type === "required" && (
                          <p className="text-danger error-message">
                            Brand Required!
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-4 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="title">Product Title</label>
                        <input
                          id="title"
                          type="text"
                          name="title"
                          {...register("title", { required: true })}
                          className="form-control form-control-sm"
                        />
                        {errors.title?.type === "required" && (
                          <p className="text-danger error-message">
                            Title Required!
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-4 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="price">Product Price</label>
                        <input
                          id="price"
                          type="number"
                          name="price"
                          {...register("price", { required: true })}
                          className="form-control form-control-sm"
                        />
                        {errors.price?.type === "required" && (
                          <p className="text-danger error-message">
                            Price Required!
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-8 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="description">Product Description</label>
                        <textarea
                          id="description"
                          name="description"
                          {...register("description", { required: true })}
                          className="form-control form-control-sm"
                          rows="2"
                          placeholder=""
                        />
                        {errors.description?.type === "required" && (
                          <p className="text-danger error-message">
                            Description Required!
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="category">Category</label>
                      <select
                        id="category"
                        name="category"
                        {...register("category", { required: true })}
                        className="form-control"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="text-danger">Category is required!</p>
                      )}
                    </div>

                    <div className="col-lg-4 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="brand">Upload Image</label>
                        <input
                          id="image"
                          type="file"
                          name="image"
                          {...register("image", { required: true })}
                          className="form-control form-control-sm"
                          onChange={(event) => handleChange(event)}
                        />
                        {errors.image?.type === "required" && (
                          <p className="text-danger error-message">
                            Please Upload Image!
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-12 col-xs-12">
                      <div className="form-group">
                        <label>Add Colors</label>
                        <div className="checkbox-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              value="Red"
                              {...register("color")}
                              className="checkbox-input"
                            />{" "}
                            Red
                          </label>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              value="Black"
                              {...register("color")}
                              className="checkbox-input"
                            />{" "}
                            Black
                          </label>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              value="Beige"
                              {...register("color")}
                              className="checkbox-input"
                            />{" "}
                            Beige
                          </label>

                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              value="Yellow"
                              {...register("color")}
                              className="checkbox-input"
                            />{" "}
                            Yellow
                          </label>

                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              value="White"
                              {...register("color")}
                              className="checkbox-input"
                            />{" "}
                            White
                          </label>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              value="Maroon"
                              {...register("color")}
                              className="checkbox-input"
                            />{" "}
                            Maroon
                          </label>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              value="Grey"
                              {...register("color")}
                              className="checkbox-input"
                            />{" "}
                            Grey
                          </label>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              value="Blue"
                              {...register("color")}
                              className="checkbox-input"
                            />{" "}
                            Blue
                          </label>

                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              value="Teal"
                              {...register("color")}
                              className="checkbox-input"
                            />{" "}
                            Teal
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 col-xs-12">
                      <div className="form-group">
                        <label>Add Sizes</label>
                        <div className="checkbox-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              value="XS"
                              {...register("size")}
                              className="checkbox-input"
                            />{" "}
                            XS
                          </label>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              value="S"
                              {...register("size")}
                              className="checkbox-input"
                            />{" "}
                            S
                          </label>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              value="M"
                              {...register("size")}
                              className="checkbox-input"
                            />{" "}
                            M
                          </label>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              value="L"
                              {...register("size")}
                              className="checkbox-input"
                            />{" "}
                            L
                          </label>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              value="XL"
                              {...register("size")}
                              className="checkbox-input"
                            />{" "}
                            XL
                          </label>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              value="XXL"
                              {...register("size")}
                              className="checkbox-input"
                            />{" "}
                            XXL
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 col-xs-12   text-center">
                      <button type="submit" className="submit-button">
                        Add Product
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notifications */}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
}

export default AdminDashboard;
