import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Products from "./components/Products";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Banner />
      <Products />
      <Footer />
    </div>
  );
}

export default App;
