import React, { Component } from "react";
import { nullUser } from "../../state/API";

class MapMarker extends Component {
	static defaultProps = {
		userLabel: nullUser.firstName,
		imgURL: nullUser.imgURL
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<div className="marker">
					{/* <h3 className="marker__label">{this.props.userLabel}</h3> */}
					<figure className="marker__figure">
						<img
							className="marker__figure__img"
							onError={this.addDefaultSrc}
							src={"" + this.props.imgURL}
							alt="Profile pic"
						/>
					</figure>
				</div>
			</React.Fragment>
		);
	}

	addDefaultSrc = ev => {
		ev.target.src = nullUser.imgURL;
		console.log("error: changing image");
	};
}

export default MapMarker;
