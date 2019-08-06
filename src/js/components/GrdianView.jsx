import React from "react";
import "../../css/common.css";
import "../../css/specific/login.css";
import "../../css/responsive.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from "../../images/Grdian-logo.png";
import profilePic from "../../images/Profile-pic-stock.jpg";

export default class LoginForm extends React.Component {
  render() {
    // const greeting = "grdian login";
    const greeting = this.props.greeting;

    return (
      <>
        <section class="profile-panel">
          <div class="profile-panel__image">
            <img src={profilePic} alt="Profile pic" />
          </div>
          <div class="profile-panel__info">
            <h3 class="profile-panel__info-element">first last name</h3>
            <h3 class="profile-panel__info-element">location</h3>
          </div>
        </section>
        <button class="join-button">Delete grdian</button>
      </>
    );
  }
}
