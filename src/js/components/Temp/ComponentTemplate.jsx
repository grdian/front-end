import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as API from "../../state/API";

class ComponentTemplate extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      redirectFlags: { login: false, main: false },
      redirectPaths: { login: "/login", main: "/main" }
    };
  }

  // RENDER =============================================================================================
  // ====================================================================================================
  render() {
    if (this.shouldRedirect()) {
      return <Redirect to={this.getRedirectPath()} />;
    }

    return (
      <React.Fragment>
        <h1>ComponentTemplate</h1>
        <h2>Most Components Should Copy this Template.</h2>
      </React.Fragment>
    );
  }

  // ====================================================================================================

  componentDidMount() {
    this._isMounted = true;
    this.setLoginRedirect();

    // Make Async Fetch Calls Below. In "then" statement, check "_isMounted" before updating this.state.
    let dataPromise; //= fetchCall(); dataPromise.then((data)=>{ if(_isMounted){ setState({something: data}) } }) etc...
  }

  // -----------------------------------------------------------------------------------------------------
  // Login and State Management Boilerplate Below --------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------

  componentWillUnmount() {
    this._isMounted = false;
  }

  userIsNotLoggedIn() {
    return this.props.loggedInUser.id === -1;
  }

  setLoginRedirect() {
    if (this.userIsNotLoggedIn()) {
      this.setState({ redirectFlags: { login: true } });
    } else {
      this.setState({ redirectFlags: { login: false } });
    }
  }

  shouldRedirect() {
    if (this.state.redirectFlags.login === true) {
      return true;
    }
    if (this.state.redirectFlags.main === true) {
      return true;
    }
    return false;
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentTemplate);
