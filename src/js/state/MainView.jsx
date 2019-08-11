import React, { Component } from "react";
import { UserContext } from "../../state/UserContext";

class MainView extends Component {
	static contextType = UserContext;

	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: { id: -1 }
		};
	}

	componentDidMount() {
		const { loggedInUser, setLoggedInUser } = this.context;
		// const user = { id: 90 };
		// setLoggedInUser(user);
	}

	render() {
		const { loggedInUser, setLoggedInUser } = this.context;
		return (
			<React.Fragment>
				<h2>Main View</h2>
				<h3>User Id: {loggedInUser.id}</h3>
			</React.Fragment>
		);
	}
}

export default MainView;
