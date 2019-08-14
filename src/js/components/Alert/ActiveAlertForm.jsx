import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as API from "../../state/API";

class ActiveAlertForm extends Component {
	constructor(props) {
		super(props);
		this.state = { redirectToLogin: false, activeAlert: API.nullAlert };
	}

	userIsLoggedIn = () => {
		if (this.props.loggedInUser.id === -1) {
			this.setState({ redirectToLogin: true });
			return false;
		}
		return true;
	};

	componentDidMount() {
		if (this.userIsLoggedIn()) {
			let alertPromise = API.getSpecificAlert(
				this.props.loggedInUser.activeAlertId
			);
			alertPromise.then(data => {
				this.setState({ activeAlert: data });
			});
		}
	}

	render() {
		if (this.state.redirectToLogin === true) {
			return <Redirect to="/login" />;
		}
		return (
			<React.Fragment>
				<h2>Active Alert</h2>
				<h3>
					{this.props.loggedInUser.firstName +
						" " +
						this.props.loggedInUser.lastName}
				</h3>
				<h1>&quot;{this.state.activeAlert.message}&quot;</h1>
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
)(ActiveAlertForm);
