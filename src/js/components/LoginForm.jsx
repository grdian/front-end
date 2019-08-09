import React from "react";
import { Link } from "react-router-dom";

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
          <button className="join-button">
            <Link to="/main">Login</Link>
          </button>
        </form>

        <Link to="/create">create account</Link>
      </>
    );
  }
}
