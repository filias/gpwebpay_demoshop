import React, { useState, useEffect, useContext } from "react";
import "./Products.css";
import ProductItem from "./ProductItem";
import { Context } from "../Context";

function Products() {
  const { products } = useContext(Context);
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
