import React from "react";

function ProductItem({ product }) {
  return (
    <li key={product.id}>
      <img src={product.image} />
      <div>{product.title}</div>
      <div className="products__info">
        <span> &euro; {product.price} </span>
        <button
          id={product.id}
          className="products__btn"
          data-price={product.price}
        >
          {" "}
          <i className="fa fa-cart-plus" aria-hidden="true"></i>
        </button>
      </div>
    </li>
  );
}

export default ProductItem;
