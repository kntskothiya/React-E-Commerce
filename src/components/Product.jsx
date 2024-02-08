import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import clothinfo from "../clothinfo.json";
import { FormControl, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

const Product = () => {
    let [cloth, setcloth] = useState([]);
    let [filtercloths, setfiltercloths] = useState([]);
    let [searchquery, setsearchquery] = useState("");
    let [sizefilter, setsizefilter] = useState("All");
    let [currentpage, setcurrentpage] = useState(1);
    let ippage = 8;

    useEffect(() => {
        setcloth(clothinfo.productsdata);
        setfiltercloths(clothinfo.productsdata);
    }, []);

    let searchcloth = () => {
        let filtercloth = cloth.filter((cloths) => {
            let ctype = cloths.type.toLowerCase().includes(searchquery.toLowerCase());
            let csize = sizefilter === "All" || cloths.size === sizefilter;
            return ctype && csize;
        });
        setfiltercloths(filtercloth);
        setcurrentpage(1);
    };

    let paginate = (pageno) => setcurrentpage(pageno);

    let totalpage = Math.ceil(filtercloths.length / ippage);
    let pnum = [];
    for (let i = 1; i <= totalpage; i++) {
        pnum.push(i);
    }

    let lastitem = currentpage * ippage;
    let firstitem = lastitem - ippage;
    let currentitem = filtercloths.slice(firstitem, lastitem);

    return (
        <>
            <div className="container-fluid bg-dark">
                <div className="row">
                    <div className="d-flex justify-content-end py-3 headingsearch">
                        <h4 className="text-white me-auto">
                            Showing {firstitem + 1} to {Math.min(lastitem, filtercloths.length)} of {filtercloths.length} results for "Cloth"
                        </h4>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchquery}
                                onChange={(e) => setsearchquery(e.target.value)}
                            />
                            <Form.Select
                                className="me-3 ms-2"
                                onChange={(e) => setsizefilter(e.target.value)}
                                value={sizefilter}
                            >
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
                </div>
                <div className="row">
                    {currentitem.map((k) => (
                            <div className="col-sm-6 col-md-4 col-lg-3" key={k.id}>
                                <Link
                                    to={`/ProductDetail/${k.id}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Card style={{ border: "none" }} className="mb-4">
                                        <Card.Img
                                            variant="top"
                                            src={k.image}
                                            style={{ height: "400px" }}
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                <h2>{k.type}</h2>
                                            </Card.Title>
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
                    {pnum.map((pageno) => (
                        <Pagination.Item
                            key={pageno}
                            active={pageno === currentpage}
                            onClick={() => paginate(pageno)}
                        >
                            {pageno}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </>
    );
};

export default Product;
