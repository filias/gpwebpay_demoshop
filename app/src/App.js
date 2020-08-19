import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./components/Products";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Products />
      <Footer />
    </div>
  );
}

export default App;
