import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

let Cart = ({ kcart, settocart }) => {
  let [cartitem, setcartitem] = useState([]);

  useEffect(() => {
    let savecart = JSON.parse(localStorage.getItem("info")) || [];
    setcartitem(savecart);
    settocart(savecart);
  }, [settocart]);

  let remove = (kk) => {
    let updatedcart = cartitem.filter((item) => item.id !== kk);
    localStorage.setItem("info", JSON.stringify(updatedcart));
    setcartitem(updatedcart);
    settocart(updatedcart);
  };

  let plus = (kk) => {
    let updatedcart = cartitem.map((item) => {
      if (item.id === kk) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    localStorage.setItem("info", JSON.stringify(updatedcart));
    setcartitem(updatedcart);
    settocart(updatedcart);
  };

  let minus = (kk) => {
    let updatedcart = cartitem.map((item) => {
      if (item.id === kk && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    localStorage.setItem("info", JSON.stringify(updatedcart));
    setcartitem(updatedcart);
    settocart(updatedcart);
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
                  <FaMinusCircle onClick={() => minus(item.id)} /> {item.quantity} <FaPlusCircle onClick={() => plus(item.id)} />
                </span>
              </h5>
              <h5>Amount : ₹ {item.quantity * item.price}</h5>
              <button className="btn btn-danger" onClick={() => remove(item.id)}>Remove</button>
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
