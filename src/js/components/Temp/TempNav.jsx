import React, { Component } from "react";
import { Link } from "react-router-dom";

const TempNav = props => {
  return (
    <React.Fragment>
      <h4>(Temporary Nav Links for testing)</h4>
      <Link to="/template">
        <h3>TEMPLATE</h3>
      </Link>
      <Link to="/login">
        <h3>LoginForm</h3>
      </Link>
      <Link to="/signup">
        <h3>SignUpForm</h3>
      </Link>
      <Link to="/alertform">
        <h3>AlertForm</h3>
      </Link>
      <Link to="/newalert">
        <h3>NewAlert</h3>
      </Link>
      <Link to="/activealert">
        <h3>ActiveAlert</h3>
      </Link>
      <Link to="/grdians">
        <h3>AllGrdiansView</h3>
      </Link>
      <Link to="/grdians/1">
        <h3>SingleGrdianView</h3>
      </Link>
    </React.Fragment>
  );
};

export default TempNav;
