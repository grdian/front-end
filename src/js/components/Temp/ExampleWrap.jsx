import React, { Component } from "react";
import * as API from "../../state/API";
import LocationDisplay from "./LocationDisplay";

class ExampleWrap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			singleAlert: {
				id: 8,
				senderId: 3,
				timeStamp: "2019-08-17T17:01:33.049",
				message: "SQUIRRELS! SQUIRRELS EVERYWHERE!",
				urgency: "EMERGENCY",
				latitude: 40.0162232,
				longitude: -83.01433,
				senderFirstName: "Charles",
				senderLastName: "Doan",
				resolved: false
			},
			user: {
				id: 3,
				firstName: "Charles",
				lastName: "Doan",
				imgURL: "images/portraits/portrait_charles_doan.jpg",
				phoneNumber: "+13304325448",
				emailAddress: "doan@gmail.com",
				activeAlertId: 8,
				grdians: [
					{
						id: 1
					},
					{
						id: 2
					},
					{
						id: 6
					},
					{
						id: 5
					},
					{
						id: 4
					}
				]
			}
		};
	}

	render() {
		const singleAlert = this.state.singleAlert;
		return (
			<React.Fragment>
				<h1>
					{singleAlert.senderFirstName + " " + singleAlert.senderLastName}
				</h1>
				<h3>Urgency:{" " + singleAlert.urgency}</h3>
				<h4>Problem: &quot;{this.state.singleAlert.message}&quot;</h4>
				<LocationDisplay
					coords={[
						this.state.singleAlert.latitude,
						this.state.singleAlert.longitude
					]}
					user={this.state.user}
				/>
			</React.Fragment>
		);
	}
}

export default ExampleWrap;
