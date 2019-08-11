import React, { Component } from "react";
import Header from "./Header/Header";
import MainContainer from "./MainContainer/MainContainer";
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
					<MainContainer>{this.props.children}</MainContainer>
					<Footer />
				</div>
			</React.Fragment>
		);
	}
}

export default Layout;
