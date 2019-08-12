import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class NewAlertForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		return (
			<React.Fragment>
				<h2>NewAlert Form</h2>
				<h3>{this.props.loggedInUser.id}</h3>
			</React.Fragment>
		);
	}
}

export default NewAlertForm;
