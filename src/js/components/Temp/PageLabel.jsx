import React, { Component } from "react";
import { connect } from "react-redux";
import "./css/dev.css";

class PageLabel extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// <PageLabel display={true} path="/" componentName="Component" />

	render() {
		if (this.props.display === false) {
			return <React.Fragment />;
		}
		return (
			<React.Fragment>
				<div className="pageLabel">
					<h4>
						{" "}
						&quot;{this.props.path || "/none"}&quot;{" = "}
						{this.props.componentName || "PageLabel"}
					</h4>
					<h4>
						User:
						{" " + this.props.loggedInUser.firstName}
						{" " + this.props.loggedInUser.lastName}
					</h4>
					<h4>Id: {this.props.loggedInUser.id}</h4>
				</div>
			</React.Fragment>
		);
	}
}

// REDUX-RELATED FUNCTIONS BELOW ---------------------------

const mapStateToProps = state => {
	return {
		loggedInUser: state.loggedInUser,
		pageLabel: state.pageLabel
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
		setPageLabel: pagePathAndName => {
			dispatch({
				type: "SET_LABEL",
				payload: pagePathAndName
			});
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PageLabel);
