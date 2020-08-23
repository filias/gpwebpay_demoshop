import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-right">
        <a href={"https://github.com/vintesk/gpwebpay"}>
          Check gpwebpay package <i className="fas fa-code-branch"></i>
        </a>
      </div>
      <div className="footer-left">
        <p>DemoShop &copy; 2020</p>
      </div>
    </footer>
  );
}

export default Footer;
