import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class AllGrdiansView extends Component {
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
      allGrdians: []
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

    fetch("http://localhost:8080/api/allgrdians/")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            allGrdians: result
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

  render() {
    const { loggedInUser, allGrdians } = this.state;

    return (
      <React.Fragment>
        <h2>AllGrdiansView</h2>
        <h3>
          User:
          {this.state.loggedInUser.firstName +
            " " +
            this.state.loggedInUser.lastName}
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
)(AllGrdiansView);
