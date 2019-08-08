import React from "react";
import "../../css/specific/mainView.css"
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from "../../images/grdian_logo.png";
import profilePic from "../../images/Profile-pic-stock.jpg";

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: [
        {
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
      ]
    };
  }

  componentDidMount() {
    // Reference: https://reactjs.org/docs/faq-ajax.html
    fetch("http://localhost:8080/api/users")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            users: result
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
    const { error, isLoaded, users } = this.state;
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
            {users.map(user => (
              <div key={user.id} className="profile-grdians__image">
                <Link to={"/grdian/" + user.id}>
                  <img src={user.imgURL} alt="grdian pic" />
                </Link>
              </div>
            ))}
          </section>
        </div>
      </>
    );
  }
}
