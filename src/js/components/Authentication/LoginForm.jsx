import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as API from "../../state/API";

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = { redirectToMain: false, loginForm: API.nullLoginForm };
	}

	tryUserLogin = async event => {
		event.preventDefault();
		const loginForm = this.state.loginForm;

		let userPromise = API.getSpecificGrdianByEmail(loginForm.emailAddress);
		userPromise
			.then(data => {
				if (data !== undefined && data != null && data != "") {
					this.props.setLoggedInUser(data);
					this.setState({ redirectToMain: true });
				}
			})
			.catch(exception => {
				console.log("Invalid email or password.");
			});
	};

	updateEmailAddress = event => {
		this.setState({ loginForm: { emailAddress: event.target.value } });
	};

	render() {
		if (this.state.redirectToMain === true) {
			return <Redirect to="/main" />;
		}

		return (
			<React.Fragment>
				<h1 className="main-title">grdian</h1>
				<form className="input-panel" onSubmit={this.tryUserLogin}>
					<h3 className="field-label">Email:</h3>
					<input
						type="text"
						placeholder="so-and-so@domain.com"
						className="field-value"
						onChange={this.updateEmailAddress}
					/>
					<h3 className="field-label">Password:</h3>
					<input type="text" placeholder="password" className="field-value" />
					<br />
					<button className="join-button">Login</button>
				</form>
				<Link to="/signup">sign up / new account</Link>
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
)(LoginForm);
