import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as API from "../../state/API";

// Alert Forms to Branch based on logged in user state
import NewAlertForm from "./NewAlertForm";
import ActiveAlertForm from "./ActiveAlertForm";

class AlertForm extends Component {
	constructor(props) {
		super(props);
		this.state = { redirectToLogin: false };
	}

	userIsLoggedIn = () => {
		if (this.props.loggedInUser.id === -1) {
			this.setState({ redirectToLogin: true });
			return false;
		}
		return true;
	};

	componentDidMount() {
		if (this.userIsLoggedIn() == false) {
			this.setState({ redirectToLogin: true });
			return;
		}
	}

	render() {
		if (this.state.redirectToLogin === true) {
			console.log("redirecting to login");
			return <Redirect to="/login" />;
		}
		if (this.props.loggedInUser.activeAlertId === -1) {
			console.log("returning NEW alert form");
			return <NewAlertForm />;
		} else {
			console.log("returning ACTIVE alert form");
			return <ActiveAlertForm />;
		}
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
)(AlertForm);
