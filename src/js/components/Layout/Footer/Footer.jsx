import React, { Component } from "react";
import TempNav from "../../Temp/TempNav";

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<React.Fragment>
				<footer className="footer">
					<TempNav />
					<h4>&copy; {new Date().getFullYear()} grdian Inc.</h4>
				</footer>
			</React.Fragment>
		);
	}
}

export default Footer;
