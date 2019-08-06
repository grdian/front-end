import React from "react";
import "../../css/common.css";
import "../../css/specific/login.css";
import "../../css/responsive.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from "../../images/Grdian-logo.png";

export default class CreateProfile extends React.Component {
  render() {
    // const greeting = "grdian login";
    const greeting = this.props.greeting;

    return (
      <>
        <h1 class="main-title">{greeting}</h1>

        <section class="input-panel">
          <h3 class="field-label">First Name:</h3>
          <input required placeholder="your first name" class="field-value" />
          <h3 class="field-label">Last Name:</h3>
          <input required placeholder="your last name" class="field-value" />
          <h3 class="field-label">Profile Picture:</h3>
          <input
            type="text"
            required
            name="imageUrl"
            placeholder="Enter Square Image Url"
          />
          <h3 class="field-label">Phone Number:</h3>
          <input required placeholder="1234567890" class="field-value" />
          <h3 class="field-label">Email:</h3>
          <input
            required
            placeholder="so-and-so@domain.com"
            class="field-value"
          />
          <h3 class="field-label">Password:</h3>
          <input required placeholder="password" class="field-value" />
          <h3 class="field-label">Confirm Password:</h3>
          <input required placeholder="Confirm Password" class="field-value" />
          <h3 class="input-panel__submit">
            <Link to="/main">create</Link>
          </h3>
        </section>
      </>
    );
  }
}
