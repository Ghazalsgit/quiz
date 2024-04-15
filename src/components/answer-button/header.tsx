import React from "react";
import image from "../../images/helo.png";
import "./header.scss";

function Header() {
  return (
    <div className="header">
      <img src={image} alt="helo logo" />
    </div>
  );
}

export default Header;
