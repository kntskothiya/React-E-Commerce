import React from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const Cart = ({ kcart }) => {
  const removeFromCart = (itemId) => {
    const updatedCart = kcart.filter((item) => item.id !== itemId);
    localStorage.setItem("info", JSON.stringify(updatedCart));
  };

  return (
    <>
      {kcart.map((item) => (
        <div key={item.id}>
          <div className="d-flex justify-content-evenly">
            <div className="mt-5 mb-5">
              <img src={item.image} alt="Not Found" height={"200px"} />
            </div>
            <div style={{ marginTop: "80px" }}>
              <h5>Type : {item.type}</h5>
              <h5>Price : ₹ {item.price}</h5>
              <h5>
                Qty :{" "}
                <span>
                  <FaMinusCircle /> {item.quantity} <FaPlusCircle />
                </span>
              </h5>
              <h5>Amount : ₹ {item.quantity * item.price}</h5>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
          <hr />
        </div>
      ))}
      <div className="mt-3 row">
        <h3 className="col-8"></h3>
        <h3 className="col-4">
          Total : ₹
          {kcart.reduce((total, item) => total + item.price * item.quantity, 0)}
        </h3>
      </div>
    </>
  );
};

export default Cart;
