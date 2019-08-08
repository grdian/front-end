import React from "react";
import "../../css/common.css";
import "../../css/specific/login.css";
import "../../css/responsive.css";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      user: {
        id: 1,
        firstName: "Lawrence",
        lastName: "Mboya",
        imgURL:
          "https://images.pexels.com/photos/555790/pexels-photo-555790.png?auto=compress&cs=tinysrgb&dpr=1&w=500",
        phoneNumber: "1234567890",
        emailAddress: "mboya@gmail.com",
        password: "password",
        sentMessages: []
      }
    };
  }

  componentDidMount() {
    // Reference: https://reactjs.org/docs/faq-ajax.html
    fetch("http://localhost:8080/api/users/" + this.props.match.params.id)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            user: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, user } = this.state;

    return (
      <>
        <section className="profile-panel">
          <div className="profile-panel__image">
            <img src={user.imgURL} alt="Profile pic" />
          </div>
          <div className="profile-panel__info">
            <h3 className="profile-panel__info-element">
              {user.firstName + " " + user.lastName}
            </h3>
            <h3 className="profile-panel__info-element">Location</h3>
          </div>
        </section>
        <button className="join-button">Delete grdian</button>
      </>
    );
  }
}
