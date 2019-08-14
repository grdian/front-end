import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as API from "../../state/API";

class MainView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectToLogin: false,
			grdians: API.nullGrdianList,
			alerts: API.nullAlertList
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
		if (this.userIsLoggedIn()) {
			// Set State: Grdians of Logged In User
			let grdianListPromise = API.getGrdiansOfUser(this.props.loggedInUser.id);
			grdianListPromise.then(data => {
				this.setState({ grdians: data });
			});

			// Set State: Active Alerts for Logged In User
			let alertListPromise = API.getActiveAlertsOfUser(
				this.props.loggedInUser.id
			);
			alertListPromise.then(data => {
				this.setState({ alerts: data });
			});
		}
	}

	refetchLoggedInUser = () => {
		let userPromise = API.getSpecificGrdian(this.props.loggedInUser.id);
		userPromise.then(data => {
			if (data !== undefined && data != null && data != "") {
				this.props.setLoggedInUser(data);
			}
		});
	};

	render() {
		if (this.state.redirectToLogin === true) {
			return <Redirect to="/login" />;
		}

		const loggedInUser = this.props.loggedInUser;
		const grdians = this.state.grdians;
		const alerts = this.state.alerts;
		return (
			<React.Fragment>
				<button className="alert-button__main">
					<Link to="/alertform">
						<h1>alert grdians</h1>
					</Link>
				</button>
				<section className="profile-panel">
					<div className="profile-panel__image">
						<img src={loggedInUser.imgURL} alt="Profile pic" />
					</div>
					<div className="profile-panel__info">
						<h3 className="profile-panel__info-element">
							{loggedInUser.firstName + " " + loggedInUser.lastName}
						</h3>
						<h3 className="profile-panel__info-element">
							{loggedInUser.phoneNumber}
						</h3>
						<h3 className="profile-panel__info-element">
							{loggedInUser.emailAddress}
						</h3>
					</div>
				</section>
				<section className="container-convo">
					<h2 className="title">Alerts</h2>
					{alerts.map(alert => (
						<Link key={"/alerts/" + alert.id} to={"/alerts/" + alert.id}>
							<div key={alert.id} className="convo">
								<h4>{alert.senderFirstName + " " + alert.senderLastName}</h4>
								<p>{alert.message}</p>
							</div>
						</Link>
					))}
				</section>

				<div className="container-grdians">
					<h2 className="title">grdians</h2>
					<section className="profile-grdians">
						{grdians.map(grdian => (
							<div key={grdian.id} className="profile-grdians__image">
								<Link
									key={"/grdians/" + grdian.id}
									to={"/grdians/" + grdian.id}
								>
									<img src={"/" + grdian.imgURL} alt="grdian pic" />
								</Link>
							</div>
						))}
					</section>
				</div>
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
)(MainView);
