import React from "react";
import { Link } from "react-router-dom";

const toggleMenu = () => {
  let hamburgerIcon = document.getElementById("burger");
  hamburgerIcon.classList.toggle("is-active");
  let menuBlock = document.getElementById("menu-container");
  menuBlock.classList.toggle("opened");
};
const Menu = () => {
  return (
    <div>
      <div id="burger" className="burger" onClick={toggleMenu}>
        <div className="burger__lines">
          <div className="burger__lines-single" />
          <div className="burger__lines-single" />
          <div className="burger__lines-single" />
        </div>
      </div>
      <div id="menu-container" className="menu-container">
        <Link to="/main">
          <h3 className="menu-link">Profile</h3>
        </Link>
        <Link to="/grdians">
          <h3 className="menu-link">All grdians</h3>
        </Link>
        <a href="/login" className="menu-link">
          Log Out
        </a>
        {/* <Link to="/login">
          <h3 className="menu-link">Log Out</h3>
        </Link> */}
      </div>
    </div>
  );
};

export default Menu;
