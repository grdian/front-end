import React from "react";
import "../../css/common.css";
import "../../css/specific/login.css";
import "../../css/responsive.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from "../../images/Grdian-logo.png";

export default class LoginForm extends React.Component {
  render() {
    return (
      <>
        <h1 className="main-title">grdian</h1>

        <form className="input-panel">
          <h3 className="field-label">Email:</h3>
          <input
            type="text"
            required
            placeholder="so-and-so@domain.com"
            className="field-value"
          />
          <h3 className="field-label">Password:</h3>
          <input
            type="text"
            required
            placeholder="password"
            className="field-value"
          />
          <br />
          <button className="input-panel__submit">
            <Link to="/main">Login</Link>
          </button>
        </form>

        <Link to="/create">create account</Link>
      </>
    );
  }
}
