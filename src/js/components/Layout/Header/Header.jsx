import React, { Component } from "react";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<React.Fragment>
				<header className="header">
					<figure className="header__logo">
						<img
							src={process.env.PUBLIC_URL + "/images/logos/grdian-logo.png"}
							alt="grdian logo"
						/>
					</figure>
				</header>
			</React.Fragment>
		);
	}
}

export default Header;
