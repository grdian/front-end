import React from "react";
import "../../css/common.css";
import "../../css/specific/login.css";
import "../../css/responsive.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from "../../images/Grdian-logo.png";

export default class LoginForm extends React.Component {
  render() {
    // const greeting = "grdian login";
    const greeting = this.props.greeting;

    return (
      <>
        <h1 class="main-title">{greeting}</h1>

        <form class="input-panel">
          <h3 class="field-label">Email:</h3>
          <input
            type="text"
            required
            placeholder="so-and-so@domain.com"
            class="field-value"
          />
          <h3 class="field-label">Password:</h3>
          <input
            type="text"
            required
            placeholder="password"
            class="field-value"
          />
          <br />
          <button class="input-panel__submit">
            <Link to="/main">Login</Link>
          </button>
        </form>

        <Link to="/create">create account</Link>
      </>
    );
  }
}
