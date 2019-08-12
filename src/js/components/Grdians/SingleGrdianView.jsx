import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class SingleGrdianView extends Component {
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
      singleGrdian: {
        id: -1,
        firstName: "No Grdian Loaded",
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
    const { error, isLoaded, loggedInUser, singleGrdian } = this.state;
    return (
      <React.Fragment>
        <section className="profile-panel">
          <div className="profile-panel__image">
            <img src={"/" + singleGrdian.imgURL} alt="Profile pic" />
          </div>
          <div className="profile-panel__info">
            <h3 className="profile-panel__info-element">
              {singleGrdian.firstName + " " + singleGrdian.lastName}
            </h3>
          </div>
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
)(SingleGrdianView);
