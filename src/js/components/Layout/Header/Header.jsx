import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<React.Fragment>
				<header className="header">
					<Link to="/main">
						<figure className="header__logo">
							<img
								src={process.env.PUBLIC_URL + "/images/logos/grdian-logo.png"}
								alt="grdian logo"
							/>
						</figure>
					</Link>
				</header>
			</React.Fragment>
		);
	}
}

export default Header;
