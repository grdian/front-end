import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as API from "../../state/API";
import LocationDisplay from "../Geolocation/LocationDisplay";

class SingleAlertView extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			redirectFlags: { login: false, main: false },
			redirectPaths: { login: "/login", main: "/main" },
			singleAlert: API.nullAlert,
			alertSender: API.nullUser
		};
	}

	componentDidMount() {
		this._isMounted = true;
		this.performLoginCheck();

		let alertPromise = API.getSpecificAlert(this.props.match.params.id);
		alertPromise.then(data => {
			if (this._isMounted) {
				this.setState({ singleAlert: data });
				let userPromise = API.getSpecificGrdian(data.senderId);
				userPromise.then(userData => {
					this.setState({ alertSender: userData });
				});
			}
		});
	}

	// RENDER =============================================================================================
	// ====================================================================================================
	render() {
		if (this.shouldRedirect()) {
			return <Redirect to={this.getRedirectPath()} />;
		} else if (this._isMounted && this.state.singleAlert.id !== -1) {
			const singleAlert = this.state.singleAlert;
			const alertSender = this.state.alertSender;
			return (
				<React.Fragment>
					<h1>
						{singleAlert.senderFirstName + " " + singleAlert.senderLastName}
					</h1>
					<h3>{singleAlert.urgency}</h3>
					<h3>&quot;{this.state.singleAlert.message}&quot;</h3>
					{/* <h4>{singleAlert.location}</h4> */}
					<LocationDisplay
						coords={[singleAlert.latitude, singleAlert.longitude]}
						user={alertSender}
					/>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<h1>Loading...</h1>
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
)(SingleAlertView);
