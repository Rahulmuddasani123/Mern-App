import React from "react";
import Empty_Wishlist from "../../Images/Empty_Wishlist.jpg";

function EmptyWishlistImage() {
  return (
    <div className="text-center p-3 m-3">
      <img src={Empty_Wishlist} width={330} alt="Empty Wishlist" />
    </div>
  );
}

export default EmptyWishlistImage;
