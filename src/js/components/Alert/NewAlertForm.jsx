import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as API from "../../state/API";

class NewAlertForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectToLogin: false,
			redirectToMain: false,
			redirectToAlertForm: false,
			newAlert: API.defaultNewAlertForm
		};
	}

	userIsLoggedIn = () => {
		if (this.props.loggedInUser.id === -1) {
			this.setState({ redirectToLogin: true });
			return false;
		}
		return true;
	};

	componentDidMount() {
		this.userIsLoggedIn();
	}

	sendNewAlert = event => {
		event.preventDefault();
		let alertPromise = API.postCreateNewAlert(
			this.props.loggedInUser.id,
			this.state.newAlert.message,
			this.state.newAlert.urgency,
			this.state.newAlert.location
		);
		alertPromise
			.then(data => {
				console.log(data);
				if (data !== undefined && data != null && data != "") {
					this.props.setActiveAlertId(data.id);
				}
				this.setState({ redirectToAlertForm: true });
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

	updateLocation = event => {
		this.setState({
			newAlert: {
				...this.state.newAlert,
				location: event.target.value
			}
		});
	};

	render() {
		if (this.state.redirectToLogin === true) {
			return <Redirect to="/login" />;
		}
		if (this.state.redirectToAlertForm === true) {
			return <Redirect to="/alertform" />;
		}

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
						<input
							type="text"
							placeholder={this.state.newAlert.location}
							className="field-value"
							onChange={this.updateLocation}
						/>
					</section>
				</form>
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
)(NewAlertForm);
