import "./App.css";
import Navbars from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import Product from "./components/Product";
import { useState, useEffect } from "react";

function App() {
  let [carts, setcarts] = useState([]);

  useEffect(() => {
    let scart = JSON.parse(localStorage.getItem("info"));
    setcarts(scart);
  }, []);

  let additem = (clothdata) => {
    setcarts((prevcart) => [...prevcart, clothdata]);
  };

  return (
    <>
      <BrowserRouter>
        <Navbars cartlen={carts.length} />
        <Routes>
          <Route path="/" element={<Product />} />
          <Route
            path="/ProductDetail/:id"
            element={<ProductDetail cartitem={additem} />}
          ></Route>
          <Route path="/Cart" element={<Cart kcart={carts} settocart={setcarts} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;