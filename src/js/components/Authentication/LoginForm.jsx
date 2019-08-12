import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginPost: {
				emailAddress: ""
			}
		};
		this.handleLogin = this.handleLogin.bind(this);
	}

	componentDidMount() {
		const loggedInUserId = this.props.loggedInUser.id;
		if (loggedInUserId != -1) {
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

	async handleLogin(event) {
		event.preventDefault();
		const { loginPost } = this.state;
		event.preventDefault();

		try {
			const response = await fetch("http://localhost:8080/api/login", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(loginPost)
			});
			const grdian = await response.json();
			this.props.setLoggedInUserId(grdian.id);
			this.props.history.push("/main");
		} catch (ex) {
			console.log("The email or password provided were incorrect.");
		}
	}

	sendLoginPost = event => {
		const { loginPost } = this.state;
		event.preventDefault();
		console.log("Submitting " + loginPost.emailAddress);

		const response = fetch("http://localhost:8080/api/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(loginPost)
		});

		console.log(response);

		// this.props.history.push("/main"); //Redirects to main
	};

	updateEmailAddress = event => {
		this.setState({ loginPost: { emailAddress: event.target.value } });
	};

	render() {
		return (
			<React.Fragment>
				<h2>Login Form</h2>
				<h3>{this.props.loggedInUser.id}</h3>

				<h1 className="main-title">grdian</h1>

				<form className="input-panel" onSubmit={this.handleLogin}>
					<h3 className="field-label">Email:</h3>
					<input
						type="text"
						// required
						placeholder="so-and-so@domain.com"
						className="field-value"
						onChange={this.updateEmailAddress}
					/>
					<h3 className="field-label">Password:</h3>
					<input
						type="text"
						// required
						placeholder="password"
						className="field-value"
					/>
					<br />
					<button className="join-button">
						Login
						{/* <Link to="/main">Login</Link> */}
					</button>
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
