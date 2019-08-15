import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as API from "../../state/API";

class AllGrdiansView extends Component {
  constructor(props) {
    super(props);
    this.state = { redirectToLogin: false, allGrdians: API.nullGrdianList };
  }

  userIsLoggedIn = () => {
    if (this.props.loggedInUser.id === -1) {
      this.setState({ redirectToLogin: true });
      return false;
    }
    return true;
  };

  componentDidMount() {
    if (this.userIsLoggedIn() === false) {
      this.setState({ redirectToLogin: true });
      return;
    }
    let grdianListPromise = API.getAllGrdians();
    grdianListPromise.then(data => {
      this.setState({ allGrdians: data });
    });
  }

  render() {
    if (this.state.redirectToLogin === true) {
      console.log("redirecting to login");
      return <Redirect to="/login" />;
    }

    const loggedInUser = this.props.loggedInUser;
    const allGrdians = this.state.allGrdians;

    return (
      <React.Fragment>
        <h2>AllGrdiansView</h2>
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
)(AllGrdiansView);
