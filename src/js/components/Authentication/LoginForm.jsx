import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as API from "../../state/io/API";

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginForm: API.nullLoginForm
		};
	}

	attemptUserLogin = async event => {
		event.preventDefault();
		const loginForm = this.state.loginForm;
		console.log("On Submit! " + loginForm.emailAddress);

		let dataPromise = API.getSpecificGrdianByEmail(loginForm.emailAddress);
		dataPromise
			.then(data => {
				this.props.setLoggedInUserId(data.id);
			})
			.then(() => {
				this.props.history.push("/main");
			})
			.catch(exception => {
				console.log("Invalid email or password.");
			});
	};

	updateEmailAddress = event => {
		this.setState({ loginForm: { emailAddress: event.target.value } });
	};

	render() {
		return (
			<React.Fragment>
				<h1 className="main-title">grdian</h1>

				<form className="input-panel" onSubmit={this.attemptUserLogin}>
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
)(LoginForm);
