import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa";
import { RxArrowRight } from "react-icons/rx";
import { FaIndianRupeeSign } from "react-icons/fa6";
import "./Products.css";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../Slices/productSlice";
import { addtocart, updatecartitem } from "../../Slices/cartSlice";
import { addtowishlist } from "../../Slices/wishlistSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS for notifications
import No_Products  from "../../Images/No_Products.jpg";

function Products() {
  // States to store selected product details and user choices
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [productsState, setProductsState] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch(); // Hook to dispatch actions
  const navigate = useNavigate(); // Hook to navigate between routes

  // Fetch products when the component mounts
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      setProductsState(products);
      applyFiltersAndSorting();
    }
  }, [products]);

  const applyFiltersAndSorting = () => {
    let filteredData = [...productsState];

    // Apply category filter
    if (category && category !== "all") {
      filteredData = filteredData.filter((item) => item.category === category);
    }

    // Apply sorting
    if (sort === "LTH") {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (sort === "HTL") {
      filteredData.sort((a, b) => b.price - a.price);
    }

    // Apply search filter
    if (searchInput) {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    setFilteredProducts(filteredData);
  };

  useEffect(() => {
    applyFiltersAndSorting();
  }, [searchInput, sort, category, productsState]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleAddToCart = () => {
    if (selectedColor !== "" && selectedSize !== "") {
      const finalProduct = {
        ...selectedProduct,
        size: selectedSize,
        color: selectedColor,
        quantity: selectedQuantity,
      };

      if (Object.keys(selectedProduct).length > 0) {
        dispatch(addtocart(finalProduct));
        dispatch(updatecartitem(finalProduct));

        toast.success("Product added to cart!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        const modal = document.getElementById("viewProductModal");
        const modalInstance = window.bootstrap.Modal.getInstance(modal);
        modalInstance.hide();

        setTimeout(() => {
          navigate("/Cart");
        }, 1500);
      } else {
        toast.error("Failed to add product to cart!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      toast.error("Please select a size and color!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleAddToWishlist = async () => {
    if (selectedColor !== "" && selectedSize !== "") {
      const finalProduct = {
        ...selectedProduct,
        size: selectedSize,
        color: selectedColor,
        quantity: selectedQuantity,
      };

      if (Object.keys(selectedProduct).length > 0) {
        await dispatch(addtowishlist(finalProduct));

        toast.success("Product added to wishlist!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      toast.error("Please select a size and color!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="d-flex flex-row justify-content-between p-1  row">
          <div className="d-flex flex-row  col-xs-12 col-lg-5 mt-1">
            <select
              className="form-select me-2 inter"
              value={sort}
              onChange={(e) => handleSort(e)}
            >
              <option selected>Sort</option>
              <option value="HTL">Price High to Low</option>
              <option value="LTH">Price Low to High</option>
            </select>

            <select
              className="form-select inter"
              value={category}
              onChange={(e) => handleCategory(e)}
            >
              <option value="all" selected>
                Category
              </option>
              <option value="all">All</option>
              <option value="shirt"> Shirts</option>
              <option value="tshirt"> Tshirts</option>
              <option value="pant"> Pants </option>
              <option value="short"> Shorts</option>
            </select>
          </div>

          <div className="d-flex flex-row justify-content-lg-end  col-xs-6 col-lg-7 mt-1 ">
            <div className="me-2">
              <input
                type="text"
                className="form-control me-2 inter"
                placeholder="Search Products"
                value={searchInput}
                onChange={(e) => handleSearch(e)}
              ></input>
            </div>
          </div>
        </div>

        <hr></hr>

        <div className="row p-3 ">
          <div className=" row">
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-12"
                  style={{ height: "300px;" }}
                  key={product._id}
                >
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
                      {/* Button to open product detail modal */}
                      <button
                        type="button"
                        className="view_product_button"
                        data-bs-toggle="modal"
                        data-bs-target="#viewProductModal"
                        onClick={() => setSelectedProduct(product)}
                      >
                        View <span className="">Product</span> <RxArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div class="d-flex justify-content-center">
                {/* <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> */}
                <img src={No_Products} width={300}/>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for viewing product details */}
      <div
        className="modal"
        id="viewProductModal"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="viewProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <span className="view_product_brand_header">
                  {selectedProduct.brand}
                </span>
                <br />
                <span className="view_product_name">
                  {selectedProduct.title}
                </span>
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
                    <img
                      src={selectedProduct.productImage}
                      width={300}
                      alt={selectedProduct.title}
                    />
                  </div>
                  <div className="col-lg-7 col-xs-12 p-3 pt-1">
                    <div>
                      <div className="mt-3 mb-3">
                        <p className="product_color-header">Description:</p>
                        <span className="view_description">
                          {selectedProduct.description}
                        </span>
                      </div>
                      <div className="d-flex flex-row justify-content-between mb-3">
                        {/* Size selection */}
                        <div>
                          <p className="product_color-header">Size</p>
                          <select
                            className="form-select form-select-sm"
                            style={{ color: "#1F316F" }}
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                          >
                            <option value="">Select</option>
                            {selectedProduct.size &&
                            selectedProduct.size.length > 0 ? (
                              selectedProduct.size.map((size, index) => (
                                <option key={index} value={size}>
                                  {size}
                                </option>
                              ))
                            ) : (
                              <option disabled>No sizes available</option>
                            )}
                          </select>
                        </div>
                        {/* Color selection */}
                        <div>
                          <p className="product_color-header">Color</p>
                          <select
                            className="form-select form-select-sm"
                            style={{ color: "#1F316F" }}
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                          >
                            <option value="">Select</option>
                            {selectedProduct.color &&
                            selectedProduct.color.length > 0 ? (
                              selectedProduct.color.map((color, index) => (
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
                            value={selectedQuantity}
                            onChange={(e) =>
                              setSelectedQuantity(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <span className="view_product_price mt-3">
                          <FaIndianRupeeSign />
                          {selectedProduct.price}
                        </span>
                      </div>
                      <div className="d-flex flex-row justify-content-between mt-4">
                        {/* Button to add product to cart */}
                        <button
                          className="addtocart_button inter"
                          onClick={handleAddToCart}
                        >
                          Add to cart &nbsp; <FaCartPlus />
                        </button>
                        {/* Button to add product to wishlist */}
                        <button
                          className="addtowishlist_button inter"
                          onClick={handleAddToWishlist}
                        >
                          Wishlist &nbsp; <CiHeart className="fs-4" />
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
      <ToastContainer />
    </div>
  );
}

export default Products;
