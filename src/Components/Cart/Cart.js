import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getfromcart,
  removefromcart,
  updatecartitem,
} from "../../Slices/cartSlice";
import { fetchProducts } from "../../Slices/productSlice";
import { addtowishlist } from "../../Slices/wishlistSlice";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EditProductModal from "./EditProductModal";
import WishlistButton from "./WishlistButton";
import BackButton from "./BackButton";
import CheckoutImage from "./CheckoutImage";
import EmptyCartImage from "./EmptyCartImage";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);

  // State for handling edited product details
  const [editedProduct, setEditedProduct] = useState({});
  const [editedSize, setEditedSize] = useState("");
  const [editedColor, setEditedColor] = useState("");
  const [editedQuantity, setEditedQuantity] = useState(1);

  // Fetch cart and product data on component mount
  useEffect(() => {
    dispatch(getfromcart());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleRemoveFromCart = async (cartItem) => {
    try {
      await dispatch(removefromcart(cartItem));
      dispatch(getfromcart());
    } catch (error) {
      toast.error("Failed to remove item from cart", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleAddToWishlist = async (cartItem) => {
    try {
      await dispatch(addtowishlist(cartItem));
      toast.success("Product added to wishlist!", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to add to wishlist", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleEditProduct = async () => {
    if (editedProduct && editedSize) {
      const finalProduct = {
        ...editedProduct,
        size: editedSize,
        color: editedColor,
        quantity: editedQuantity,
      };

      try {
        await dispatch(updatecartitem(finalProduct));
        toast.success("Product updated in cart!", {
          position: "top-center",
          autoClose: 2000,
        });

        const modal = document.getElementById("editProductModal");
        const modalInstance = window.bootstrap.Modal.getInstance(modal);
        modalInstance.hide();

        setTimeout(() => {
          navigate("/Cart");
        }, 1500);
      } catch (error) {
        toast.error("Failed to update product in cart!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } else {
      toast.error("Please select a size and color!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + parseFloat(item.price) * parseFloat(item.quantity),
    0
  );
  const discount = 0;
  const finalAmount = totalPrice - discount;

  const findProductData = (productId) => {
    const product = products.find((product) => product._id === productId) || {};
    return {
      ...product,
      size: Array.isArray(product.size) ? product.size : [],
      color: Array.isArray(product.color) ? product.color : [],
    };
  };

  return (
    <div className="container-fluid p-5 pt-3">
      <div className="row mt-1">
        <div className="d-flex flex-row justify-content-between">
          <div className="m-0 p-0">
            <h1 className="wishlist-title mt-3 inter"> Cart </h1>
          </div>
          <div className="m-0 p-0">
            <WishlistButton />
            <BackButton navigate={navigate} />
          </div>
        </div>
        <hr />

        {cart.length > 0 ? (
          cart.map((cartItem, index) => (
            <CartItem
              key={index}
              cartItem={cartItem}
              findProductData={findProductData}
              handleEditProduct={() => {
                const productData = findProductData(cartItem._id);
                setEditedProduct({ ...cartItem, ...productData });
                setEditedSize(cartItem.size);
                setEditedColor(cartItem.color);
                setEditedQuantity(cartItem.quantity);
              }}
              handleRemoveFromCart={() => handleRemoveFromCart(cartItem)}
              handleAddToWishlist={() => handleAddToWishlist(cartItem)}
            />
          ))
        ) : (
          <EmptyCartImage />
        )}

        <hr />

        <div className="row mt-5">
          <div className="col-lg-6 col-xs-12">
            <CheckoutImage />
          </div>
          <div className="col-lg-6 col-xs-12 rounded shadow-lg p-3">
            <CartSummary
              cart={cart}
              totalPrice={totalPrice}
              discount={discount}
              finalAmount={finalAmount}
              navigate={navigate}
            />
          </div>
        </div>
      </div>

      <EditProductModal
        editedProduct={editedProduct}
        editedSize={editedSize}
        setEditedSize={setEditedSize}
        editedColor={editedColor}
        setEditedColor={setEditedColor}
        editedQuantity={editedQuantity}
        setEditedQuantity={setEditedQuantity}
        handleEditProduct={handleEditProduct}
      />

      <ToastContainer />
    </div>
  );
}

export default Cart;
