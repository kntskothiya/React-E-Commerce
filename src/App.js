import "./App.css";
import Navbars from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import Product from "./components/Product";
import { useState } from "react";

function App() {
  let [carts, setcarts] = useState([]);

  let additem = (clothdata) => {
    setcarts((a) => [...a, clothdata])
  };

  return (
    <>
      <BrowserRouter>
        <Navbars tcart={carts}/>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route
            path="/ProductDetail/:id"
            element={<ProductDetail cartitem={additem} />}
          ></Route>
          <Route path="/Cart" element={<Cart kcart={carts}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
