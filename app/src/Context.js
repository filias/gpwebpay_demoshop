import React, { useState, useEffect, useReducer } from "react";

const Context = React.createContext();

function ContextProvider(props) {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  async function fetchProducts() {
    const response = await fetch("./products.json");
    const json = await response.json();
    setProducts(json);
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  function cartReducer(state, product) {
    return [...state, product];
  }

  function addToCart(newProduct) {
    setCartProducts((prevProducts) => [...prevProducts, newProduct]);
    setTotalAmount(
      (prevProducts) => prevProducts + parseFloat(newProduct.price)
    );
  }
  function removeFromCart(product) {
    console.log(product);
    setCartProducts((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
    // setTotalAmount((prevProducts) => prevProducts - parseFloat(product.price));
  }

  function emptyCart() {
    setCartProducts([]);
    setTotalAmount(0);
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
