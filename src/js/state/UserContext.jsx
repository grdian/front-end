import React, { createContext, Component } from "react";

let persistedState = {
	loggedInUser: {
		id: -2
	}
};
export const UserContext = createContext();

class UserContextProvider extends Component {
	state = {
		...persistedState
	};

	updateState = nextState =>
		this.setState(nextState, () => {
			persistedState = { ...this.state };
		});

	setLoggedInUser = user => {
		// console.log(user);
		this.setState({ loggedInUser: user });
	};

	render() {
		return (
			<UserContext.Provider
				value={{
					...this.state,
					setLoggedInUser: this.setLoggedInUser,
					updateState
				}}
			>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}

export default UserContextProvider;
