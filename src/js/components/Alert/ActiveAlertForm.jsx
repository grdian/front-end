import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as API from "../../state/API";

class ActiveAlertForm extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      redirectFlags: { login: false, main: false },
      redirectPaths: { login: "/login", main: "/main" },
      activeAlert: API.nullAlert
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.performLoginCheck();

    let alertPromise = API.getSpecificAlert(
      this.props.loggedInUser.activeAlertId
    );
    alertPromise.then(data => {
      if (this._isMounted) {
        this.setState({ activeAlert: data });
      }
    });
  }

  resolveAlert = event => {
    event.preventDefault();
    let alertPromise = API.postResolveAlert(this.state.activeAlert.id);
    alertPromise.then(() => {
      this.setState({ redirectFlags: { main: true } });
      this.refetchLoggedInUser();
    });
  };

  // RENDER =============================================================================================
  // ====================================================================================================
  render() {
    if (this.shouldRedirect()) {
      return <Redirect to={this.getRedirectPath()} />;
    } else {
      return (
        <React.Fragment>
          <h2>Active Alert For:</h2>
          <h3>
            {this.props.loggedInUser.firstName +
              " " +
              this.props.loggedInUser.lastName}
          </h3>
          <h1 className="convo__active">
            &quot;{this.state.activeAlert.message}&quot;
          </h1>
          <button className="alert-button__resolve" onClick={this.resolveAlert}>
            <h1>Mark Resolved</h1>
          </button>
        </React.Fragment>
      );
    }
  }

  // ====================================================================================================

  // -----------------------------------------------------------------------------------------------------
  // Login and State Management Boilerplate Below --------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------

  componentWillUnmount() {
    this._isMounted = false;
  }

  performLoginCheck() {
    //The state of the logged-in user should be updated on every page.
    if (this.userIsNotLoggedIn()) {
      console.log("User not logged in. Redirecting to login.");
      this.setState({ redirectFlags: { login: true } });
    } else {
      console.log("Updating logged in user.");
      this.refetchLoggedInUser();
    }
  }

  userIsNotLoggedIn() {
    return this.props.loggedInUser.id === -1;
  }

  refetchLoggedInUser() {
    let userPromise = API.getSpecificGrdian(this.props.loggedInUser.id);
    userPromise.then(data => {
      if (data !== undefined && this._isMounted) {
        this.props.setLoggedInUser(data);
      }
    });
  }

  shouldRedirect() {
    let redirect = false;
    if (this.state.redirectFlags.login === true) {
      redirect = true;
    }
    if (this.state.redirectFlags.main === true) {
      redirect = true;
    }
    return redirect;
  }

  getRedirectPath() {
    if (this.state.redirectFlags.login === true) {
      return this.state.redirectPaths.login;
    }
    if (this.state.redirectFlags.main === true) {
      return this.state.redirectPaths.main;
    }
    return false;
  }
}

// REDUX BOILERPLATE BELOW ---------------------------

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
    },
    setLoggedInUser: user => {
      dispatch({
        type: "SET_USER",
        payload: user
      });
    },
    setActiveAlertId: activeAlertId => {
      dispatch({
        type: "SET_ALERT_ID",
        payload: activeAlertId
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveAlertForm);
