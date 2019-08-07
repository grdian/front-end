import React from "react";
import logo from "../../images/Grdian-logo.png";

const Header = ({}) => (
  <header className="header">
    <figure className="header__logo">
      <img src={logo} alt="grdian logo" />
    </figure>
  </header>
);

export default Header;
