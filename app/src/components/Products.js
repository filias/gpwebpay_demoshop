import React, { useState, useEffect } from "react";
import "./Products.css";
import ProductItem from "./ProductItem";

function Products() {
  const [products, setProducts] = useState([]);
  async function fetchProducts() {
    const response = await fetch("./products.json");
    const json = await response.json();
    setProducts(json);
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  const productsElements = products.map((product) => (
    <ProductItem key={product.id} product={product} />
  ));
  return (
    <div className="container">
      <h4>Our Offers</h4>
      <ul className="products">{productsElements}</ul>
    </div>
  );
}

export default Products;
