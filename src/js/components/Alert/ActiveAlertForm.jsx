import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class ActiveAlertForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		return (
			<React.Fragment>
				<h2>ActiveAlert Form</h2>
				<h3>{this.props.loggedInUser.id}</h3>
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
