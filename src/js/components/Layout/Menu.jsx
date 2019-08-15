import React from "react";

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
        <a className="menu-link" href="#main">
          Profile
        </a>
        <a className="menu-link" href="#grdians">
          All Grdians
        </a>
        <a className="menu-link" href="#login">
          Log Out
        </a>
      </div>
    </div>
  );
};

export default Menu;
