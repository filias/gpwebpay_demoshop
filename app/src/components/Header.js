import React, { useState, useContext } from "react";
import "./Header.css";
import logo from "../img/avocado-logo.png";
import { Context } from "../Context";

function Header() {
  const { cartProducts, emptyCart, removeFromCart } = useContext(Context);
  const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  function getTotal(cartProducts) {
    const totalAmount = cartProducts.reduce(
      (acc, item) => acc + parseFloat(item.price),
      0
    );
    return totalAmount;
  }
  function displayTotal(cartProducts) {
    const totalAmount = cartProducts.reduce(
      (acc, item) => acc + parseFloat(item.price),
      0
    );
    return totalAmount.toLocaleString(undefined, currencyOptions);
  }

  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const cartElements = cartProducts.map((product, index) => (
    <div key={index}>
      {product.title} - &euro; {product.price}
      <button onClick={() => removeFromCart(product)} className="remove-btn">
        <i className="fa fa-trash" aria-hidden="true"></i>
      </button>
    </div>
  ));
  const toggleShoppingList = () => {
    isShoppingListOpen
      ? setIsShoppingListOpen(false)
      : setIsShoppingListOpen(true);
  };
  const proceedPayment = () => {
    fetch(`${window.origin}/pay`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(getTotal(cartProducts)),
      cache: "no-cache",
      headers: new Headers({
        "content-type": "application/json",
      }),
    })
      .then(function (response) {
        if (response.status !== 200) {
          console.log(`There is an error! Status code: ${response.status}`);
          return;
        }
        response.json().then(function (data) {
          console.log("Redirecting to:", data["url"]);
          window.location.href = data["url"];
        });
      })
      .catch(function (error) {
        console.log("Fetch error: " + error);
      });
  };

  return (
    <header className="header">
      <a className="logo" href="/">
        <img src={logo} alt="logo" className="logo__image" />
        DemoShop
      </a>
      <div className="header__menu">
        <button className="shopping-cart" onClick={() => toggleShoppingList()}>
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        </button>
        <div>
          Total: &euro;<span id="total">{displayTotal(cartProducts)}</span>
        </div>
        <button href="" className="btn" onClick={() => proceedPayment()}>
          Checkout
        </button>
      </div>
      <div
        id="shopping-list-sidebar"
        className={
          isShoppingListOpen
            ? "sidebar shopping-list"
            : "sidebar shopping-list hide"
        }
      >
        <button
          className="closebtn"
          // todo: function
          onClick={() => toggleShoppingList()}
        >
          ×
        </button>
        <div className="shopping-list__wrapper">
          <div className="shoppint-list__title">Shopping Cart</div>
          <div className="shopping-list__item">{cartElements}</div>
          <div className="shopping-list__total">
            Total: &euro;
            <span id="total"> {displayTotal(cartProducts)}</span>
          </div>
          <button className="btn btn-checkout" onClick={() => proceedPayment()}>
            Checkout
          </button>
          <button className="btn btn-remove" onClick={() => emptyCart()}>
            Remove items
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
