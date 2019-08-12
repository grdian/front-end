import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class MainView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			loggedInUser: {
				id: -1,
				firstName: "No User Logged In",
				lastName: "",
				imgURL: "",
				phoneNumber: "",
				emailAddress: "",
				activeAlertId: -1,
				grdians: []
			},
			grdians: [
				{
					id: 100,
					firstName: "Guybrush",
					lastName: "Threepwood",
					imgURL:
						"https://ih1.redbubble.net/image.363229123.6653/flat,1000x1000,075,f.u1.jpg",
					phoneNumber: "1234567890",
					emailAddress: "guybrush@monkeyisland.com",
					password: "lucasarts",
					activeAlertId: -1,
					grdians: []
				}
			],
			alerts: []
		};
	}

	componentDidMount() {
		const loggedInUserId = this.props.loggedInUser.id;
		if (loggedInUserId === undefined || loggedInUserId == -1) {
			this.props.history.push("/login");
		} else {
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

		fetch("http://localhost:8080/api/grdians/" + loggedInUserId)
			.then(res => res.json())
			.then(
				result => {
					this.setState({
						isLoaded: true,
						grdians: result
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

	render() {
		const { error, isLoaded, loggedInUser, grdians, alerts } = this.state;
		// const grdians = loggedInUser.grdians;

		return (
			<React.Fragment>
				<button className="alert-button__main">
					<Link to="/alert">
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
				<h2 className="title">Alerts</h2>
				<section className="container-convo">
					{alerts.map(message => (
						<div key={message.id} className="convo">
							<h4>Sender</h4>
							<p>{message.body}</p>
						</div>
					))}
				</section>

				<div className="container-grdian">
					<h2 className="title">grdians</h2>
					<section className="profile-grdians">
						{grdians.map(grdian => (
							<div key={grdian.id} className="profile-grdians__image">
								<Link to={"/grdians/" + grdian.id}>
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