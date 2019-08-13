import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as API from "../../state/io/API";

class NewAlertForm extends Component {
  constructor(props) {
    super(props);
    this.state = { newAlert: API.defaultNewAlertForm };
  }

  componentDidMount() {
    this.verifyLoginOrRedirectToLogin();
  }

  sendNewAlert = event => {
    event.preventDefault();
    let alertListPromise = API.postCreateNewAlert(
      this.props.loggedInUser.id,
      this.state.newAlert.message,
      this.state.newAlert.urgency,
      this.state.newAlert.location
    );
    alertListPromise
      .then(data => {
        console.log(data);
        // this.props.history.push("/main");
      })
      .then(() => {
        this.props.history.push("/main");
      });
  };

  updateMessage = event => {
    this.setState({
      newAlert: {
        ...this.state.newAlert,
        message: event.target.value
      }
    });
  };

  updateUrgency = event => {
    this.setState({
      newAlert: {
        ...this.state.newAlert,
        urgency: event.target.value
      }
    });
  };

  updateLocation = event => {
    this.setState({
      newAlert: {
        ...this.state.newAlert,
        location: event.target.value
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>{this.props.loggedInUser.firstName}</h1>
        <h2>NewAlert Form</h2>

        <form onSubmit={this.sendNewAlert}>
          <button className="alert-button__send">
            <h1>send alert</h1>
          </button>
          <section className="input-panel">
            <h3 className="field-label">Help Message:</h3>
            <input
              type="text"
              required
              defaultValue={this.state.newAlert.message}
              contentEditable="true"
              className="field-value"
              onChange={this.updateMessage}
            />
            <h3 className="field-label">Urgency Level:</h3>
            <select name="urgency" onChange={this.updateUrgency}>
              <option className="emergency" value={API.URGENCY_LEVELS[0]}>
                {API.URGENCY_LEVELS[0]}
              </option>
              <option className="high" value={API.URGENCY_LEVELS[1]}>
                {API.URGENCY_LEVELS[1]}
              </option>
              <option className="moderate" value={API.URGENCY_LEVELS[2]}>
                {API.URGENCY_LEVELS[2]}
              </option>
              <option className="minor" value={API.URGENCY_LEVELS[3]}>
                {API.URGENCY_LEVELS[3]}
              </option>
            </select>
            <h3 className="field-label">Location:</h3>
            <input
              type="text"
              placeholder={this.state.newAlert.location}
              className="field-value"
              onChange={this.updateLocation}
            />
          </section>
        </form>
      </React.Fragment>
    );
  }

  verifyLoginOrRedirectToLogin = () => {
    if (
      this.props.loggedInUser === undefined ||
      this.props.loggedInUser.id == -1
    ) {
      console.log("Redirecting to Login.");
      this.props.history.push("/login");
      // Failed to login, return false to avoid running async state tasks
      return false;
    }
    // Successfully logged in, return true to begin executing async state tasks
    return true;
  };
}

// REDUX-RELATED FUNCTIONS BELOW ---------------------------

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoggedInUser: user => {
      dispatch({
        type: "SET_USER",
        payload: user
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAlertForm);
