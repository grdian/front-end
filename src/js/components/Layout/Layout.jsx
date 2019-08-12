import React, { Component } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<React.Fragment>
				<div className="wrapper">
					<Header />
					<main className="main">{this.props.children}</main>
					<Footer />
				</div>
			</React.Fragment>
		);
	}
}

export default Layout;
