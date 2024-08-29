import React from "react";
import EmptyCart from "../../Images/Empty_Cart.jpg";

function EmptyCartImage() {
  return (
    <div className="text-center m-3">
      <img src={EmptyCart} width={300} />
    </div>
  );
}

export default EmptyCartImage;
