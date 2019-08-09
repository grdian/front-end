import React from "react";
import "../../css/specific/mainView.css";
import { Link } from "react-router-dom";

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      loggedInUser: {
        id: 420,
        firstName: "Erlich",
        lastName: "Bachman",
        imgURL: "/images/bachman.jpg",
        phoneNumber: "6664201337",
        emailAddress: "bachmanity@piedpiper.com",
        password: "middleout",
        sentMessages: []
      },
      users: [
        {
          id: 100,
          firstName: "Guybrush",
          lastName: "Threepwood",
          imgURL:
            "https://ih1.redbubble.net/image.363229123.6653/flat,1000x1000,075,f.u1.jpg",
          phoneNumber: "1234567890",
          emailAddress: "guybrush@monkeyisland.com",
          password: "lucasarts",
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
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, loggedInUser, users } = this.state;
    return (
      <>
        <button className="alert-button__main">
          <Link to="/send">
            <h1>alert grdians</h1>
          </Link>
        </button>
        <section className="profile-panel">
          <div className="profile-panel__image">
            <img src={loggedInUser.imgURL} alt="Profile pic" />
          </div>
          <div className="profile-panel__info">
            <h3 className="profile-panel__info-element">
              {loggedInUser.firstName + " " + loggedInUser.lastName}
            </h3>
            <h3 className="profile-panel__info-element">
              {loggedInUser.phoneNumber}
            </h3>
            <h3 className="profile-panel__info-element">
              {loggedInUser.emailAddress}
            </h3>
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
