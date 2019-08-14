import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Alert Forms to Branch based on logged in user state
import NewAlertForm from "./NewAlertForm";
import ActiveAlertForm from "./ActiveAlertForm";

class AlertForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.verifyLoginOrRedirectToLogin();
  }

  render() {
    return (
      <React.Fragment>
        <NewAlertForm />
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
)(AlertForm);
