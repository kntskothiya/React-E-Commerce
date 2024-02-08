import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import cloth from "../clothinfo.json";

const ProductDetails = ({ cartitem }) => {
  let { id } = useParams();
  let [single, setsingle] = useState(false);
  let [quantity, setquantity] = useState(1);

  let clothdata = cloth.productsdata.find((clothwear) => clothwear.id == id);

  useEffect(() => {
    let exist = JSON.parse(localStorage.getItem("info")) || [];
    let foundItem = exist.find((item) => item.id === clothdata.id);
    if (foundItem) {
      setsingle(true);
      setquantity(foundItem.quantity);
    }
  }, [clothdata.id]);

  if (!clothdata) {
    return (
      <div>
        <div className="section">
          <h1 className="error">404</h1>
          <div className="page">
            Ooops !! The page you are looking for is not found
          </div>
        </div>
      </div>
    );
  }

  const addtocart = () => {
    if (!single) {
      cartitem({ ...clothdata, quantity });
      let exist = JSON.parse(localStorage.getItem("info")) || [];
      let update = [...exist, { ...clothdata, quantity }];
      localStorage.setItem("info", JSON.stringify(update));
      setsingle(true);
    }
  };

  const plus = () => {
    setquantity(quantity + 1);
    updatelsquantity(quantity + 1);
  };

  const minus = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
      updatelsquantity(quantity - 1);
    }
  };

  const updatelsquantity = (updatedquantity) => {
    let exist = JSON.parse(localStorage.getItem("info")) || [];
    let updatecart = exist.map((item) => {
      if (item.id === clothdata.id) {
        return { ...item, quantity: updatedquantity };
      } else {
        return item;
      }
    });
    localStorage.setItem("info", JSON.stringify(updatecart));
  };

  return (
    <>
      <div className="container mt-5 mb-3">
        <div className="row">
          <div className="col-md-12 col-lg-6 col-sm-12 mt-5 mb-5">
            <div>
              <img
                src={clothdata.image}
                alt="Not Found"
                width={"70%"}
                height={"400px"}
              />
            </div>
          </div>
          <div className="col-md-12 col-lg-6 col-sm-12 mt-5">
            <div>
              <h2>{clothdata.type}</h2>
              <h6>Brand : {clothdata.brand}</h6>
              <h6>Color : {clothdata.color}</h6>
              <h6>Size : {clothdata.size}</h6>
              <h6>Price: ₹ {clothdata.price}</h6>
              <h6>Description : {clothdata.description}</h6>
            </div>
            <div className="mt-5">
              {!single ? (
                <div>
                  <button className="me-5 btn btn-success">Buy Now</button>
                  <button
                    className="me-5 btn btn-warning"
                    onClick={addtocart}
                  >Add To cart</button>
                </div>
              ) : (
                <div>
                  <button className="me-5 btn btn-success">Buy Now</button>
                  <button className="me-5 btn btn-warning"> Qty : <FaMinusCircle onClick={minus} /> {quantity} <FaPlusCircle onClick={plus} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
