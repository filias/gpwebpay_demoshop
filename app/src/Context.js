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

  function toggleFavorite(id) {
    const updatedProducts = products.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isFavorite: !item.isFavorite,
        };
      }
      return item;
    });
    setProducts(updatedProducts);
  }
  return (
    <Context.Provider
      value={{
        products: products,
        cartProducts: cartProducts,
        addToCart,
        emptyCart,
        removeFromCart,
        toggleFavorite,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
