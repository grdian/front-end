import React, { Component } from "react";

class MainContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<React.Fragment>
				<main className="main">{this.props.children}</main>
			</React.Fragment>
		);
	}
}

export default MainContainer;
