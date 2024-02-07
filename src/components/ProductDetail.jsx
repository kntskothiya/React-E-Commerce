import React, { useState } from "react";
import { useParams } from "react-router-dom";
import cloth from "../clothinfo.json";

const ProductDetails = ({ cartitem }) => {
    let { id } = useParams();
    let [single, setsingle] = useState(false);

    let clothdata = cloth.productsdata.find((clothwear) => clothwear.id == id);
    if (!clothdata) {
        return (
            <div>
                <div class="section">
                    <h1 class="error">404</h1>
                    <div class="page">
                        Ooops !! The page you are looking for is not found
                    </div>
                </div>
            </div>
        );
    }

    let cartad = () => {
        if (!single) {
            cartitem(clothdata);
            setsingle(true);
        }
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
                            <button className="me-5 btn btn-success">Buy Now</button>
                            <button className="btn btn-warning" onClick={cartad}>
                                Add To cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;