import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Alert Forms to Branch based on logged in user state
import NewAlertForm from "./NewAlertForm";
import ActiveAlertForm from "./ActiveAlertForm";

class AlertForm extends Component {
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
      }
    };
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

  render() {
    return (
      <React.Fragment>
        {/* <h2>Alert Form</h2>
        <h3>
          User:
          {this.state.loggedInUser.firstName +
            " " +
            this.state.loggedInUser.lastName}
        </h3> */}

        <NewAlertForm />
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
)(AlertForm);
