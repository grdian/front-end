import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as API from "../../state/API";

class SingleGrdianView extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      redirectFlags: { login: false, main: false },
      redirectPaths: { login: "/login", main: "/main" },
      viewedGrdian: API.nullUser
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.performLoginCheck();

    let grdianPromise = API.getSpecificGrdian(this.props.match.params.id);
    grdianPromise.then(data => {
      if (this._isMounted) {
        this.setState({ viewedGrdian: data });
      }
    });
  }

  // RENDER =============================================================================================
  // ====================================================================================================
  render() {
    if (this.shouldRedirect()) {
      return <Redirect to={this.getRedirectPath()} />;
    } else {
      const viewedGrdian = this.state.viewedGrdian;
      return (
        <React.Fragment>
          <section className="profile-panel">
            <div className="profile-panel__image">
              <img src={"/" + viewedGrdian.imgURL} alt="Profile pic" />
            </div>
            <div className="profile-panel__info">
              <h3 className="profile-panel__info-element">
                {viewedGrdian.firstName + " " + viewedGrdian.lastName}
              </h3>
            </div>
            {this.getGrdianButton()}
          </section>
        </React.Fragment>
      );
    }
  }

  // ====================================================================================================

  viewedGrdianIsFriend() {
    let foundFriend = false;
    const viewedGrdian = this.state.viewedGrdian;
    console.log(viewedGrdian.id);
    this.props.loggedInUser.grdians.forEach(singleGrdian => {
      console.log(singleGrdian);
      if (viewedGrdian.id === singleGrdian.id) {
        console.log("found friend");
        foundFriend = true;
      }
    });
    return foundFriend;
  }

  getGrdianButton() {
    if (this.viewedGrdianIsFriend()) {
      return (
        <button id="DeleteButton" type="button" onClick={this.unLinkGrdians}>
          Delete Grdian
        </button>
      );
    } else {
      return (
        <button id="AddButton" type="button" onClick={this.linkGrdians}>
          Add Grdian
        </button>
      );
    }
  }

  linkGrdians = event => {
    event.preventDefault();
    const viewedGrdianId = this.state.viewedGrdian.id;
    const loggedInUserId = this.props.loggedInUser.id;
    let dataPromise = API.postLinkGrdians(viewedGrdianId, loggedInUserId);
    dataPromise.then(date => {
      this.refetchLoggedInUser();
    });
    console.log("linked Gardians");
  };

  unLinkGrdians = event => {
    event.preventDefault();
    const viewedGrdianId = this.state.viewedGrdian.id;
    const loggedInUserId = this.props.loggedInUser.id;
    let dataPromise = API.postUnlinkGrdians(viewedGrdianId, loggedInUserId);
    dataPromise.then(date => {
      this.refetchLoggedInUser();
    });
    console.log("unLinked Gardians");
  };

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
)(SingleGrdianView);
