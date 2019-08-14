import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as API from "../../state/API";

class SingleGrdianView extends Component {
	constructor(props) {
		super(props);
		this.state = { redirectToLogin: false, singleGrdian: API.nullUser };
	}

	userIsLoggedIn = () => {
		if (this.props.loggedInUser.id === -1) {
			this.setState({ redirectToLogin: true });
			return false;
		}
		return true;
	};

	componentDidMount() {
		if (this.userIsLoggedIn() == false) {
			this.setState({ redirectToLogin: true });
			return;
		}
		let grdianPromise = API.getSpecificGrdian(this.props.match.params.id);
		grdianPromise.then(data => {
			this.setState({ singleGrdian: data });
		});
	}

	render() {
		if (this.state.redirectToLogin === true) {
			return <Redirect to="/login" />;
		}
		const singleGrdian = this.state.singleGrdian;
		return (
			<React.Fragment>
				<section className="profile-panel">
					<div className="profile-panel__image">
						<img src={"/" + singleGrdian.imgURL} alt="Profile pic" />
					</div>
					<div className="profile-panel__info">
						<h3 className="profile-panel__info-element">
							{singleGrdian.firstName + " " + singleGrdian.lastName}
						</h3>
					</div>
				</section>
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
)(SingleGrdianView);
