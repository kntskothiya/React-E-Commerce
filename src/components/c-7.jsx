import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const Cart = ({cartitem}) => {
  let [cart, setCart] = useState([]);

  useEffect(() => {
    let savecart = JSON.parse(localStorage.getItem("info")) || [];
    let updatecart = savecart.map((item) => ({
      ...item, quantity: item.quantity || 1,
    }));
    setCart(updatecart);
  }, []);

  let remove = (index) => {
    let updatecart = [...cart];
    updatecart.splice(index, 1);
    setCart(updatecart);
    localStorage.setItem("info", JSON.stringify(updatecart));
  };

  let minus = (index) => {
    let updatecart = [...cart];
    if (updatecart[index].quantity > 1) {
      updatecart[index].quantity--;
      setCart(updatecart);
      localStorage.setItem("info", JSON.stringify(updatecart));
    }
  };

  let plus = (index) => {
    let updatecart = [...cart];
    updatecart[index].quantity++;
    setCart(updatecart);
    localStorage.setItem("info", JSON.stringify(updatecart));
  };

  let totalamt = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <>
      {cart.map((item, index) => (
        <div key={index} className="d-flex justify-content-evenly">
          <div className="mt-5 mb-5">
            <img src={item.image} alt="Not Found" height={"200px"} />
          </div>
          <div style={{ marginTop: "80px" }}>
            <h5>Type : {item.type}</h5>
            <h5>Price : ₹ {item.price}</h5>
            <h5>
              Qty : <FaMinusCircle onClick={() => minus(index)} /> {item.quantity} <FaPlusCircle onClick={() => plus(index)} />
            </h5>
            <h5>Amount : ₹ {item.price * item.quantity}</h5>
            <button className="btn btn-danger" onClick={() => remove(index)}>Remove</button>
          </div>
        </div>
      ))}
      <hr />
      <div className="mt-3 row">
        <h3 className="col-8"></h3>
        <h3 className="col-4">Total : ₹ {totalamt}</h3>
      </div>
    </>
  );
};

export default Cart;
