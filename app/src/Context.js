import React, { useState, useEffect, useReducer } from "react";

const Context = React.createContext();

function ContextProvider(props) {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useReducer(cartReducer, []);
  const [totalAmount, setTotalAmount] = useReducer(totalReducer, 0);

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

  function totalReducer(state, action) {
    if (action.type === "add") {
      return state + parseFloat(action.price);
    } else if (action.type === "remove") {
      return state - parseFloat(action.price);
    }
    return 0;
  }

  function addToCart(newProduct) {
    const { price } = newProduct;
    setCartProducts({ newProduct, type: "add" });
    setTotalAmount({ price, type: "add" });
  }
  function removeFromCart(newProduct) {
    const { price } = newProduct;
    setCartProducts({ newProduct, type: "remove" });
    setTotalAmount({ price, type: "remove" });
  }

  function emptyCart() {
    setCartProducts({ type: "removeAll" });
    setTotalAmount({ type: "removeAll" });
  }
  return (
    <Context.Provider
      value={{
        products: products,
        cartProducts: cartProducts,
        totalAmount: totalAmount,
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
