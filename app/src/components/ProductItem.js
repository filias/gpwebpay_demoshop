import React, { useContext, useState } from "react";
import { Context } from "../Context";

function ProductItem({ product }) {
  const { addToCart, removeFromCart, toggleFavorite } = useContext(Context);
  const [hovered, setHovered] = useState(false);
  function favoriteIcon() {
    if (product.isFavorite) {
      return (
        <i
          onClick={() => toggleFavorite(product.id)}
          className="fa fa-heart"
          aria-hidden="true"
        ></i>
      );
    } else if (hovered) {
      return (
        <i
          onClick={() => toggleFavorite(product.id)}
          className="fa fa-heart"
          aria-hidden="true"
        ></i>
      );
    }
  }
  return (
    <li
      key={product.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img alt={product.title} src={product.image} />
      {favoriteIcon()}
      <div>{product.title}</div>
      <div className="products__info">
        <span> &euro; {product.price} </span>
        <div>
          <button onClick={() => addToCart(product)} className="products__btn">
            <i className="fa fa-cart-plus" aria-hidden="true"></i>
          </button>
          {/* <button
            onClick={() => removeFromCart(product)}
            className="products__btn"
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button> */}
        </div>
      </div>
    </li>
  );
}

export default ProductItem;
