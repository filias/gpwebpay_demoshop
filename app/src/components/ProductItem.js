import React, { useContext } from "react";
import { Context } from "../Context";

function ProductItem({ product }) {
  const { addToCart } = useContext(Context);
  return (
    <li key={product.id}>
      <img alt={product.title} src={product.image} />
      <div>{product.title}</div>
      <div className="products__info">
        <span> &euro; {product.price} </span>
        <button onClick={() => addToCart(product)} className="products__btn">
          <i className="fa fa-cart-plus" aria-hidden="true"></i>
        </button>
      </div>
    </li>
  );
}

export default ProductItem;
