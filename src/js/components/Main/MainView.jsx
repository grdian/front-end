import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as API from "../../state/io/API";

class MainView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: API.nullUser,
			grdians: API.nullGrdianList,
			alerts: API.nullAlertList
		};
	}

	componentDidMount() {
		this.verifyUserLogin();

		// Set State: Grdians of Logged In User

		// Set State: Active Alerts for Logged In User
	}

	render() {
		return (
			<React.Fragment>
				<h1>Main</h1>
			</React.Fragment>
		);
	}

	verifyUserLogin = () => {
		//Should modify to load user once into store rather than id into store.
		//Then just check whether the id of the user loaded into the store is -1 or not on every page,
		//and if it is IS -1, then redirect to /login

		const loggedInUserId = this.props.loggedInUser.id;
		console.log(loggedInUserId);

		if (loggedInUserId === undefined || loggedInUserId == -1) {
			console.log("Redirecting to Login.");
			this.props.history.push("/login");
		} else {
			let dataPromise = API.getSpecificGrdian(loggedInUserId);
			dataPromise.then(data => {
				this.setState({
					loggedInUser: data
				});
			});
		}
	};
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
)(MainView);
