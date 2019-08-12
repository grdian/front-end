import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class NewAlertForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {
        id: -1,
        firstName: "No User Logged In",
        lastName: "",
        imgURL: "",
        phoneNumber: "",
        emailAddress: "",
        activeAlertId: -1,
        grdians: []
      },
      alertMessage: {
        message: "I need help ASAP!",
        level: "high",
        location: { latitude: 0, longitude: 0 }
      }
    };
    // this.handleSendAlert = this.handleSendAlert.bind(this);
  }

  componentDidMount() {
    const loggedInUserId = this.props.loggedInUser.id;
    if (loggedInUserId === undefined || loggedInUserId == -1) {
      this.props.history.push("/login");
    } else {
      fetch("http://localhost:8080/api/allgrdians/" + loggedInUserId)
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              isLoaded: true,
              loggedInUser: result
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
  }

  //   async handleSendAlert(event) {
  //     const { alertMessage } = this.state;
  //     event.preventDefault();

  //     await await fetch("http://localhost:8080/api/allalerts", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(alertMessage)
  //     });
  //     this.props.history.push("/main");
  //   }

  addNewMessageFetch = event => {
    // Make sure loggedInUser.id is being correctly set into alertMessage
    const { loggedInUser, alertMessage } = this.state;
    event.preventDefault();
    console.log("Message submitted!");

    fetch("http://localhost:8080/api/allalerts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(alertMessage)
    });
    // this.props.history.push("/main");
  };

  updateBody = event => {
    this.setState({
      alertMessage: {
        message: event.target.value
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <h2>NewAlert Form</h2>
        <h3>
          User:
          {this.state.loggedInUser.firstName +
            " " +
            this.state.loggedInUser.lastName}
        </h3>

        <form onSubmit={this.addNewMessageFetch}>
          <button className="alert-button__send">
            <h1>send alert</h1>
          </button>
          <section className="input-panel">
            <h3 className="field-label">Help Message:</h3>
            <input
              type="text"
              required
              defaultValue="I need help ASAP!"
              contentEditable="true"
              className="field-value"
              onChange={this.updateBody}
            />
            <h3 className="field-label">Urgency Level:</h3>
            <select name="urgency">
              <option className="emergency" value="emergency">
                EMERGENCY
              </option>
              <option className="high" value="high">
                HIGH
              </option>
              <option className="moderate" value="moderate">
                Moderate
              </option>
              <option className="minor" value="minor">
                Minor
              </option>
            </select>
            <h3 className="field-label">Location:</h3>
            <input
              type="text"
              placeholder="(40.545542, -83.453453)"
              className="field-value"
            />
          </section>
        </form>
      </React.Fragment>
    );
  }
}

// REDUX-RELATED FUNCTIONS BELOW ---------------------------

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoggedInUserId: userId => {
      dispatch({
        type: "SET_ID",
        payload: userId
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAlertForm);
