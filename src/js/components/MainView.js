import React from "react";
import "../../css/common.css";
import "../../css/specific/userProfile.css";
import "../../css/responsive.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from "../../images/grdian_logo.png";
import profilePic from "../../images/Profile-pic-stock.jpg"

export default class MainView extends React.Component {
  render() {
    // const greeting = "grdian login";
    const greeting = this.props.greeting;

    return (
      <div class="wrapper">
        <header class="header">
        <h1 ><Link to="/send">alert grdians</Link></h1>
         </header>
        <main class="main">
          <section class="profile-panel">
            <div class="profile-panel__image">
              <img src={profilePic} alt="Profile pic">
              </img>
            </div>
            <div class="profile-panel__info">
              <h3 class="profile-panel__info-element">first last name</h3>
              <h3 class="profile-panel__info-element">phone number</h3>
              <h3 class="profile-panel__info-element">email</h3>
            </div>
          </section>
          <h2 class="title">conversations</h2>
      <section class="container-convo">
        <div class="convo">
          <h4>John Doe</h4>
          <p>HELP ME!</p>
        </div>
        <div class="convo">
          <h4>Bill Bo</h4>
          <p>I need help!</p>
        </div>
      </section>

      <div class="container-grdian">
        <h2 class="title">grdians</h2>
        <section class="profile-grdians">
        
          <div class="profile-grdians__image"><Link to="/grdian"><img src={profilePic} alt="grdian pic"/></Link></div>
          <div class="profile-grdians__image"><Link to="/grdian"><img src={profilePic} alt="grdian pic"/></Link></div>
          <div class="profile-grdians__image"><Link to="/grdian"><img src={profilePic} alt="grdian pic"/></Link></div>
                
        </section>
      </div>
        </main>
      </div>
    );
  }
}
