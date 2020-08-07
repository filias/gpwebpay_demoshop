import React, { useState, useEffect } from "react";

const Context = React.createContext();

function ContextProvider(props) {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  async function fetchProducts() {
    const response = await fetch("./products.json");
    const json = await response.json();
    setProducts(json);
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  function addToCart(newProduct) {
    setCartProducts((prevProducts) => [...prevProducts, newProduct]);
  }
  console.log(cartProducts);

  return (
    <Context.Provider
      value={{ products: products, cartProducts: cartProducts, addToCart }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
