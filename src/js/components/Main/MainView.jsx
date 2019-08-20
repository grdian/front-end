import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as API from "../../state/API";

class MainView extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false,
      redirectFlags: { login: false, main: false },
      redirectPaths: { login: "/login", main: "/main" },
      grdians: API.nullGrdianList,
      alerts: API.nullAlertList
    };
  }

  getUrgencyClassName = singleAlert => {
    const alertUrgencyLevel = singleAlert.urgency;
    const defaultLevels = API.URGENCY_LEVELS;

    let className = "emergency";

    if (alertUrgencyLevel === defaultLevels[0]) {
      // EMERGENCY
      className = "emergency";
    } else if (alertUrgencyLevel === defaultLevels[1]) {
      // HIGH
      className = "high";
    } else if (alertUrgencyLevel === defaultLevels[2]) {
      // Moderate
      className = "moderate";
    } else {
      // Minor
      className = "minor";
    }
    return className;
  };

  addDefaultSrc = ev => {
    console.log("Error in MainView: Invalid image, changing to default.");
    ev.target.src = API.nullUser.imgURL;
  };

  componentDidMount() {
    this._isMounted = true;
    this.performLoginCheck();

    if (this.userIsNotLoggedIn() !== true) {
      // Set State: Grdians of Logged In User
      let grdianListPromise = API.getGrdiansOfUser(this.props.loggedInUser.id);
      grdianListPromise.then(data => {
        this.setState({ grdians: data });
      });

      // Set State: Active Alerts for Logged In User
      let alertListPromise = API.getActiveAlertsOfUser(
        this.props.loggedInUser.id
      );
      alertListPromise.then(data => {
        this.setState({ alerts: data });
      });
    }
  }

  refetchLoggedInUser = () => {
    let userPromise = API.getSpecificGrdian(this.props.loggedInUser.id);
    userPromise.then(data => {
      if (data !== undefined && data != null && data != "") {
        this.props.setLoggedInUser(data);
      }
    });
  };

  render() {
    if (this.shouldRedirect()) {
      return <Redirect to={this.getRedirectPath()} />;
    } else {
      const loggedInUser = this.props.loggedInUser;
      const grdians = this.state.grdians;
      const alerts = this.state.alerts;
      return (
        <React.Fragment>
          {this.getAlertButton()}
          <section className="profile-panel">
            <div className="profile-panel__image">
              <img
                onError={this.addDefaultSrc}
                src={loggedInUser.imgURL}
                alt="Profile pic"
              />
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
          <section className="container-convo">
            <h2 className="title">Friend Alerts</h2>
            {alerts.map(alert => (
              <Link key={"/alerts/" + alert.id} to={"/alerts/" + alert.id}>
                <div key={alert.id} className="convo">
                  <h4>{alert.senderFirstName + " " + alert.senderLastName}</h4>
                  <h4 className={this.getUrgencyClassName(alert)}>
                    {alert.urgency}
                  </h4>
                  <p>{alert.message}</p>
                </div>
              </Link>
            ))}
          </section>

          <div className="container-grdians">
            <h2 className="title">grdians</h2>
            <section className="profile-grdians">
              {grdians.map(grdian => (
                <div key={grdian.id} className="profile-grdians__image">
                  <Link
                    key={"/grdians/" + grdian.id}
                    to={"/grdians/" + grdian.id}
                  >
                    <img
                      onError={this.addDefaultSrc}
                      src={"" + grdian.imgURL}
                      alt="grdian pic"
                    />
                  </Link>
                </div>
              ))}
            </section>
          </div>
        </React.Fragment>
      );
    }
  }

  getAlertButton() {
    if (this.props.loggedInUser.activeAlertId === -1) {
      return (
        <button className="alert-button__main">
          <Link to="/alertform">
            <h1>Request Help</h1>
          </Link>
        </button>
      );
    } else {
      return (
        <button className="alert-button__my-alert">
          <Link to="/alertform">
            <h1>My Alert</h1>
          </Link>
        </button>
      );
    }
  }

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
)(MainView);
