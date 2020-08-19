import React, { useState, useEffect } from "react";

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

  function addToCart(newProduct) {
    setCartProducts((prevProducts) => [...prevProducts, newProduct]);
    setTotalAmount(
      (prevProducts) => prevProducts + parseFloat(newProduct.price)
    );
  }

  return (
    <Context.Provider
      value={{
        products: products,
        cartProducts: cartProducts,
        totalAmount: totalAmount,
        addToCart,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
