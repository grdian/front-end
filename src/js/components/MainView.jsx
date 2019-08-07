import React from "react";
import "../../css/common.css";
import "../../css/specific/userProfile.css";
import "../../css/responsive.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from "../../images/grdian_logo.png";
import profilePic from "../../images/Profile-pic-stock.jpg";

export default class MainView extends React.Component {
  render() {
    return (
      <>
        <section className="profile-panel">
          <div className="profile-panel__image">
            <img src={profilePic} alt="Profile pic" />
          </div>
          <div className="profile-panel__info">
            <h3 className="profile-panel__info-element">first last name</h3>
            <h3 className="profile-panel__info-element">phone number</h3>
            <h3 className="profile-panel__info-element">email</h3>
          </div>
        </section>
        <h2 className="title">conversations</h2>
        <section className="container-convo">
          <div className="convo">
            <h4>John Doe</h4>
            <p>HELP ME!</p>
          </div>
          <div className="convo">
            <h4>Bill Bo</h4>
            <p>I need help!</p>
          </div>
        </section>

        <div className="container-grdian">
          <h2 className="title">grdians</h2>
          <section className="profile-grdians">
            <div className="profile-grdians__image">
              <Link to="/grdian">
                <img src={profilePic} alt="grdian pic" />
              </Link>
            </div>
            <div className="profile-grdians__image">
              <Link to="/grdian">
                <img src={profilePic} alt="grdian pic" />
              </Link>
            </div>
            <div className="profile-grdians__image">
              <Link to="/grdian">
                <img src={profilePic} alt="grdian pic" />
              </Link>
            </div>
          </section>
        </div>
      </>
    );
  }
}
