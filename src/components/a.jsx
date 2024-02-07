import React, { useState } from 'react';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const Cart = ({ kcart }) => {
  let [qty, setqty] = useState(kcart.map(() => 1));

  let minus = (index) => {
    if (qty[index] > 0) {
      qty[index]--;
      setqty([...qty]);
    }
  };

  let plus = (index) => {
    qty[index]++;
    setqty([...qty]);
  };

  let totalamt = 0;
  for (let i = 0; i < kcart.length; i++) {
    totalamt += kcart[i].price * qty[i];
  }

  console.log(kcart.length)

  return (
    <>
      {kcart.map((k, index) => (
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
        <h3 className="col-4">Total : ₹ {totalamt}</h3>
      </div>
    </>
  );
};

export default Cart;
