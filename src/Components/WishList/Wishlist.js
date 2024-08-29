import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  getfromwishlist,
  removefromwishlist,
} from "../../Slices/wishlistSlice";
import { addtocart, updatecartitem } from "../../Slices/cartSlice";
import WishlistItem from "./WishlistItem";
import WishlistProductModal from "./WishlistProductModal";
import WishlistButton from "./WishlistButton";
import BackButton from "./BackButton";
import EmptyWishlistImage from "./EmptyWishlistImage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Wishlist.css";

function Wishlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlist, status } = useSelector((state) => state.wishlist);

  const [selectedWishlistProduct, setSelectedWishlistProduct] = useState({});

  useEffect(() => {
    dispatch(getfromwishlist());
  }, [dispatch]);

  const handleRemoveFromWishlist = async (product) => {
    try {
      await dispatch(removefromwishlist(product));
      dispatch(getfromwishlist());
      toast.success("Product Removed!", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (error) {
      toast.error("Failed to remove product", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  const handleAddToCart = async () => {
    if (Object.keys(selectedWishlistProduct).length > 0) {
      try {
        await dispatch(addtocart(selectedWishlistProduct));
        await dispatch(updatecartitem(selectedWishlistProduct));
        await dispatch(removefromwishlist(selectedWishlistProduct));
        await dispatch(getfromwishlist());
        toast.success("Product Moved to cart!", {
          position: "top-center",
          autoClose: 1000,
        });
        navigate("/Cart");
      } catch (error) {
        toast.error("Failed to move product to cart", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    }
  };

  return (
    <div className="container pt-3">
      <div className="row mt-1">
        <div className="d-flex flex-row justify-content-between">
          <div className="m-0 p-0">
            <h1 className="wishlist-title mt-3 inter"> Wishlist </h1>
          </div>
          <div className="m-0 p-0">
            <WishlistButton />
            <BackButton navigate={navigate} />
          </div>
        </div>
        <hr />

        {status === "loading" || status === "idle" ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : status === "success" ? (
          wishlist.length > 0 ? (
            wishlist.map((product) => (
              <WishlistItem
                key={product._id}
                product={product}
                setSelectedWishlistProduct={setSelectedWishlistProduct}
              />
            ))
          ) : (
            <EmptyWishlistImage />
          )
        ) : status === "failed" ? (
          <p>Failed to load wishlist.</p>
        ) : null}

        <WishlistProductModal
          product={selectedWishlistProduct}
          handleAddToCart={handleAddToCart}
          handleRemoveFromWishlist={handleRemoveFromWishlist}
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Wishlist;
