import React from "react";
import "../../css/common.css";
import "../../css/specific/login.css";
import "../../css/responsive.css";
import CreateProfile from "../components/CreateProfile";
import logo from "../../images/grdian_logo.png";

export default class LoginForm extends React.Component {
  render() {
    // const greeting = "grdian login";
    const greeting = this.props.greeting;

    return (
      <div class="wrapper">
        <header class="header">
          <figure class="header__logo">
            <img src={logo} />
          </figure>
        </header>
        <main class="main">
          <h1 class="main-title">{greeting}</h1>

          <section class="input-panel">
            <h3 class="field-label">Email:</h3>
            <input
              required
              placeholder="so-and-so@domain.com"
              class="field-value"
            />
            <h3 class="field-label">Password:</h3>
            <input required placeholder="password" class="field-value" />
            <h3 class="input-panel__submit">Login</h3>
          </section>

          {/* <a href="../CreateProfile" class="create-account-link">
            create account
          </a> */}
          <link to={CreateProfile}>Create Account</link>
        </main>
        <footer class="footer">
          <h4>&copy; 2019 grdian Inc.</h4>
        </footer>
      </div>
    );
  }
}
