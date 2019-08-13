import React, { Component } from "react";
import * as API from "./io/API";

import "../../css/master.css";

class FetchTester extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: API.nullUser,
			grdians: API.nullGrdianList,
			singleAlert: API.nullAlert,
			alerts: API.nullAlertList,
			signUpForm: API.signUpForm,
			loginForm: API.loginForm
		};
	}

	componentDidMount() {
		// let dataPromise = API.postCreateNewGrdian(
		// 	"firstName",
		// 	"lastName",
		// 	"--",
		// 	"--",
		// 	"0002",
		// 	"password"
		// );

		let dataPromise = API.postCreateNewAlert(
			4,
			"RATASTIC!",
			"URGENT",
			"a rat infested basement"
		);

		dataPromise
			.then(data => {
				this.setState({
					grdians: data
				});
			})
			.then(console.log("FINISHED"));
	}

	render() {
		const itemToRender = this.state.grdians;
		return (
			<React.Fragment>
				<h1>Fetch Tester</h1>
				<h4 style={{ margin: "1rem 0rem", lineHeight: "3rem" }}>
					{JSON.stringify(itemToRender)}
				</h4>
			</React.Fragment>
		);
	}
}

export default FetchTester;
