import React from "react";

export default class GrdianView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      user: {
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
        <button className="join-button">Delete/ADD grdian</button>
      </>
    );
  }
}
