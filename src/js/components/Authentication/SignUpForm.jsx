import React, { Component } from "react";

class SignUpForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			imgURL: "",
			phoneNumber: "",
			emailAddress: "",
			password: ""
		};
	}

	addUserFetch = event => {
		event.preventDefault();
		fetch("http://localhost:8080/api/allgrdians", {
			method: "POST",
			body: JSON.stringify({
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				imgURL: this.state.imgURL,
				phoneNumber: this.state.phoneNumber,
				emailAddress: this.state.emailAddress,
				password: this.state.password
			})
		}).then(res => console.log(res));
		this.props.history.push("/login");
	};

	updateFirstName = event => {
		this.setState({ firstName: event.target.value });
	};
	updateLastName = event => {
		this.setState({ lastName: event.target.value });
	};
	updateImgURL = event => {
		this.setState({ imgURL: event.target.value });
	};
	updatePhoneNumber = event => {
		this.setState({ phoneNumber: event.target.value });
	};
	updateEmailAddress = event => {
		this.setState({ emailAddress: event.target.value });
	};
	updatePassword = event => {
		this.setState({ password: event.target.value });
	};

	render() {
		return (
			<form className="input-panel" onSubmit={this.addUserFetch}>
				<h3 className="field-label">First Name:</h3>
				<input
					type="text"
					required
					placeholder="your first name"
					className="field-value"
					onChange={this.updateFirstName}
				/>
				<h3 className="field-label">Last Name:</h3>
				<input
					type="text"
					required
					placeholder="your last name"
					className="field-value"
					onChange={this.updateLastName}
				/>
				<h3 className="field-label">Profile Picture:</h3>
				<input
					type="text"
					required
					placeholder="Enter Square Image Url"
					className="field-value"
					onChange={this.updateImgURL}
				/>
				<h3 className="field-label">Phone Number:</h3>
				<input
					type="tel"
					required
					placeholder="1234567890"
					className="field-value"
					onChange={this.updatePhoneNumber}
				/>
				<h3 className="field-label">Email:</h3>
				<input
					type="email"
					required
					placeholder="so-and-so@domain.com"
					className="field-value"
					onChange={this.updateEmailAddress}
				/>
				<h3 className="field-label">Password:</h3>
				<input
					type="password"
					required
					placeholder="password"
					className="field-value"
					onChange={this.updatePassword}
				/>
				<h3 className="field-label">Confirm Password:</h3>
				<input
					type="password"
					required
					placeholder="Confirm Password"
					className="field-value"
				/>
				<button className="join-button">Sign Up</button>
			</form>
		);
	}
}

export default SignUpForm;
