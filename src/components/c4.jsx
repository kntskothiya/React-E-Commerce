import React, { useState , useEffect } from 'react';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

let Cart = ({ kcart , settocart }) => {
  let [qty, setQty] = useState(() => {
    let initialQty = kcart ? kcart.map(() => 1) : [];
    let storedQty = JSON.parse(localStorage.getItem("qty"));
    return storedQty || initialQty;
  });

  let minus = (index) => {
    if (qty[index] > 0) {
      let newQty = [...qty];
      newQty[index]--;
      setQty(newQty);
      updateLocalStorage(newQty);
    } 
  };
  
  let plus = (index) => {
    let newQty = [...qty];
    newQty[index]++;
    setQty(newQty);
    updateLocalStorage(newQty);
  };

  let updateLocalStorage = (newQty) => {
    localStorage.setItem("qty", JSON.stringify(newQty));
  };

  useEffect(() => {
    let storedCart = JSON.parse(localStorage.getItem("info"));
    settocart(storedCart);
  }, [settocart]);

  return (
    <>
      {kcart && kcart.map((k, index) => (
        <div key={k.id} className="d-flex justify-content-evenly">
          <div className="mt-5 mb-5">
            <img src={k.image} alt="Not Found" height={"200px"} />
          </div>
          <div style={{ marginTop: "80px" }}>
            <h5>Type : {k.type}</h5>
            <h5>Price : ₹ {k.price}</h5>
            <h5>Qty : <FaMinusCircle onClick={() => minus(index)} /> {qty[index]} <FaPlusCircle onClick={() => plus(index)} /></h5>
            <h5>Amount : ₹ {k.price * qty[index]}</h5>
          </div>
        </div>  
      ))}
      <hr/>
      <div className="mt-3 row">
        <h3 className="col-8"></h3>
        <h3 className="col-4">Total : ₹ {kcart ? kcart.reduce((abc, item, index) => abc + item.price * qty[index], 0) : 0}</h3>
      </div>
    </>
  );
};

export default Cart;
