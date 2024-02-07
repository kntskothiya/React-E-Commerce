import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import clothinfo from "../clothinfo.json"
import { FormControl, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';

const Product = () => {
    let [cloth, setcloth] = useState([]);
    let [filtercloths, setfiltercloths] = useState([]);
    let [searchquery, setsearchquery] = useState("");
    let [sizefilter, setsizefilter] = useState("All");

    useEffect(() => {
        setcloth(clothinfo.productsdata);
        setfiltercloths(clothinfo.productsdata)
    }, [])

    let searchcloth = () => {
        let filtercloth = cloth.filter((cloths) => {
            let ctype = cloths.type.toLowerCase().includes(searchquery.toLowerCase())
            let csize = sizefilter === "All" || cloths.size === sizefilter;
            return ctype && csize;
        });
        setfiltercloths(filtercloth);
    };

    return (
        <>
            <div className="container-fluid bg-dark">
                <div className="d-flex justify-content-end py-3">
                    <h4 className="text-white me-auto">Showing 1 - 8 of 28 results for "Cloth"</h4>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search" 
                            value={searchquery}
                            onChange={(e) => setsearchquery(e.target.value)}
                        />
                        <Form.Select className="me-3 ms-2" onChange={(e) => setsizefilter(e.target.value)} value={sizefilter}>
                            <option value="All">All</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </Form.Select>
                        <Button variant="success" onClick={searchcloth}>
                            Search
                        </Button>
                    </Form>
                </div>
                <div className="row">
                    {filtercloths.map((k) => (
                        <div className="col-3" key={k.id}>
                            <Link to={`/ProductDetail/${k.id}`} style={{ textDecoration: "none" }}>
                                <Card style={{ border: "none" }} className="mb-4">
                                    <Card.Img variant="top" src={k.image} style={{ height: "400px" }} />
                                    <Card.Body>
                                        <Card.Title><h2>{k.type}</h2></Card.Title>
                                        <Card.Text>
                                            <p>Brand : {k.brand}</p>
                                            <p>Color : {k.color}</p>
                                            <p>Size : {k.size}</p>
                                            <p style={{ fontWeight: "bold" }}>Price : ₹ {k.price}</p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>
                <Pagination className="d-flex justify-content-end pb-4">
                    <Pagination.First />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Item active>{4}</Pagination.Item>
                    <Pagination.Item>{5}</Pagination.Item>

                    <Pagination.Ellipsis />
                    <Pagination.Item>{7}</Pagination.Item>
                    <Pagination.Last />
                </Pagination>
            </div>
        </>
    );
};

export default Product;
