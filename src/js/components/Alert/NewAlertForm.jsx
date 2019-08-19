import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Geocode from "react-geocode";
import * as API from "../../state/API";
import * as Geolocator from "../../state/Geolocator";

class MyNewAlertForm extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			redirectFlags: { login: false, main: false },
			redirectPaths: { login: "/login", main: "/main" },
			newAlert: API.defaultNewAlertForm,
			latitude: 0,
			longitude: 0,
			location: "Some Address"
		};
	}

	componentDidMount() {
		this._isMounted = true;
		this.performLoginCheck();
		this.determineLocation();
	}

	determineLocation = () => {
		let coordinatePromise = Geolocator.getCurrentCoordinates();
		coordinatePromise.then(coords => {
			this.setState({ latitude: coords[0] });
			this.setState({ longitude: coords[1] });
			Geocode.setApiKey(Geolocator.GOOGLE_MAPS_API_KEY);
			Geocode.fromLatLng(coords[0], coords[1]).then(
				response => {
					const address = response.results[0].formatted_address;
					this.setState({ location: address });
				},
				error => {
					console.error(error);
				}
			);
		});
	};

	sendNewAlert = event => {
		event.preventDefault();
		let alertPromise = API.postCreateNewAlert(
			this.props.loggedInUser.id,
			this.state.newAlert.message,
			this.state.newAlert.urgency,
			this.state.location,
			this.state.latitude,
			this.state.longitude
		);
		alertPromise
			.then(data => {
				console.log(data);
				if (
					data !== undefined &&
					data != null &&
					data != "" &&
					this._isMounted
				) {
					this.setState({ redirectFlags: { main: true } });
					this.props.setActiveAlertId(data.id);
				}
			})
			.catch(exception => {
				console.log(exception.message);
			});
	};

	updateMessage = event => {
		this.setState({
			newAlert: {
				...this.state.newAlert,
				message: event.target.value
			}
		});
	};

	updateUrgency = event => {
		this.setState({
			newAlert: {
				...this.state.newAlert,
				urgency: event.target.value
			}
		});
	};

	// RENDER =============================================================================================
	// ====================================================================================================
	render() {
		if (this.shouldRedirect()) {
			return <Redirect to={this.getRedirectPath()} />;
		} else {
			return (
				<React.Fragment>
					<h2>
						{this.props.loggedInUser.firstName +
							" " +
							this.props.loggedInUser.lastName}
					</h2>

					<form onSubmit={this.sendNewAlert}>
						<button className="alert-button__send">
							<h1>send alert</h1>
						</button>
						<section className="input-panel">
							<h3 className="field-label">Help Message:</h3>
							<input
								type="text"
								required
								defaultValue={this.state.newAlert.message}
								contentEditable="true"
								className="field-value"
								onChange={this.updateMessage}
							/>
							<h3 className="field-label">Urgency Level:</h3>
							<select name="urgency" onChange={this.updateUrgency}>
								<option className="emergency" value={API.URGENCY_LEVELS[0]}>
									{API.URGENCY_LEVELS[0]}
								</option>
								<option className="high" value={API.URGENCY_LEVELS[1]}>
									{API.URGENCY_LEVELS[1]}
								</option>
								<option className="moderate" value={API.URGENCY_LEVELS[2]}>
									{API.URGENCY_LEVELS[2]}
								</option>
								<option className="minor" value={API.URGENCY_LEVELS[3]}>
									{API.URGENCY_LEVELS[3]}
								</option>
							</select>
							<h3 className="field-label">Location:</h3>
							<h4>{this.state.location}</h4>
						</section>
					</form>
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
)(MyNewAlertForm);
