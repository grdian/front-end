import React, { Component } from "react";

class SingleAlertView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleAlert: {
        id: -1,
        senderId: -1,
        timeStamp: "",
        message: "BLANK ALERT",
        urgency: "nonexistent",
        location: "the upsidedown",
        senderFirstName: "Nobody",
        senderLastName: "",
        resolved: false
      }
    };
  }

  componentWillMount() {
    fetch("http://localhost:8080/api/allalerts/" + this.props.match.params.id)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            singleAlert: result
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
    const { singleAlert } = this.state;
    return (
      <React.Fragment>
        <h1>
          {singleAlert.senderFirstName + " " + singleAlert.senderLastName}
        </h1>
        <h3>{singleAlert.urgency}</h3>
        <h3>{singleAlert.message}</h3>
        <h4>{singleAlert.location}</h4>
      </React.Fragment>
    );
  }
}

export default SingleAlertView;
