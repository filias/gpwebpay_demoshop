import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../img/avocado-logo.png";

function Header() {
  const [totalAmount, setTotalAmount] = useState({
    amount: "10",
  });
  const closeShoppingList = () => {};
  const proceedPayment = () => {
    fetch(`${window.origin}/pay`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(totalAmount),
      cache: "no-cache",
      // mode: "no-cors",
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
        <button className="shopping-cart">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        </button>
        <div>
          Total: &euro;<span id="total">0</span>
        </div>
        <button href="" className="btn" onClick={() => proceedPayment()}>
          Checkout
        </button>
      </div>
      <div id="shopping-list-sidebar" className="sidebar shopping-list">
        <a
          className="closebtn"
          // todo: function
          onClick={() => closeShoppingList()}
        >
          ×
        </a>
        <div className="shopping-list__wrapper">
          <div className="shoppint-list__title">Shopping Cart</div>
          <div className="shopping-list__item">Here is the product</div>
          <div className="shopping-list__total">
            Total: &euro;
            <span id="total"> here is the total</span>
          </div>
          <button className="btn btn-checkout" onClick={() => proceedPayment()}>
            Checkout
          </button>
          <button className="btn btn-remove">Remove items</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
