import React, { useState, useEffect, useReducer } from "react";

const Context = React.createContext();

function ContextProvider(props) {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useReducer(cartReducer, []);

  async function fetchProducts() {
    const response = await fetch("./products.json");
    const json = await response.json();
    setProducts(json);
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  function cartReducer(state, action) {
    switch (action.type) {
      case "add":
        return [...state, action.newProduct];
      case "remove":
        const updatedCart = [...state];
        updatedCart.splice(updatedCart.indexOf(action.newProduct), 1);
        return updatedCart;
      case "removeAll":
        return [];
      default:
        return state;
    }
  }

  function addToCart(newProduct) {
    setCartProducts({ newProduct, type: "add" });
  }
  function removeFromCart(newProduct) {
    setCartProducts({ newProduct, type: "remove" });
  }

  function emptyCart() {
    setCartProducts({ type: "removeAll" });
  }
  return (
    <Context.Provider
      value={{
        products: products,
        cartProducts: cartProducts,
        addToCart,
        emptyCart,
        removeFromCart,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
