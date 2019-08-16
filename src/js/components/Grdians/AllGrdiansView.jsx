import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as API from "../../state/API";

class AllGrdiansView extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      redirectFlags: { login: false, main: false },
      redirectPaths: { login: "/login", main: "/main" },
      allGrdians: API.nullGrdianList
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.performLoginCheck();

    let grdianListPromise = API.getAllGrdians();
    grdianListPromise
      .then(data => {
        if (this._isMounted) {
          this.setState({ allGrdians: data });
        }
      })
      .then(this.state.allGrdians.map(grdian => {}));
  }

  // RENDER =============================================================================================
  // ====================================================================================================
  render() {
    if (this.shouldRedirect()) {
      return <Redirect to={this.getRedirectPath()} />;
    } else {
      const allGrdians = this.getGrdiansToRender();
      return (
        <React.Fragment>
          <h1>All Grdians</h1>
          <h3>
            User:
            {this.props.loggedInUser.firstName +
              " " +
              this.props.loggedInUser.lastName}
          </h3>

          <section className="profile-grdians">
            {allGrdians.map(grdian => (
              <div key={grdian.id} className="profile-grdians__image">
                <Link to={"/grdians/" + grdian.id}>
                  <img src={"/" + grdian.imgURL} alt="grdian pic" />
                </Link>
              </div>
            ))}
          </section>
        </React.Fragment>
      );
    }
  }

  getGrdiansToRender() {
    const allGrdians = this.state.allGrdians;
    let grdiansToReturn = [];

    for (let i = 0; i < allGrdians.length; i++) {
      if (this.props.loggedInUser.id != allGrdians[i].id) {
        grdiansToReturn.push(allGrdians[i]);
      }
    }

    return grdiansToReturn;
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
    console.log("shouldRedirect() is returning... " + redirect);
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
)(AllGrdiansView);
