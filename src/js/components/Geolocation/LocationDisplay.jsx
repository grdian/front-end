import React, { Component } from "react";
import Geocode from "react-geocode";
import * as Geolocator from "../../state/Geolocator";
import GoogleMapDisplay from "./GoogleMapDisplay";
import { nullUser } from "../../state/API";

class LocationDisplay extends Component {
	static defaultProps = {
		coords: [40.0162232, -83.01433],
		user: nullUser
	};

	constructor(props) {
		super(props);
		this.state = { addressText: "Nowhere" };
	}

	componentDidMount() {
		Geocode.setApiKey(Geolocator.GOOGLE_MAPS_API_KEY);
		Geocode.fromLatLng(this.props.coords[0], this.props.coords[1]).then(
			response => {
				const address = response.results[0].formatted_address;
				this.setState({ addressText: address });
			},
			error => {
				console.error(error);
			}
		);
	}

	render() {
		return (
			<React.Fragment>
				<div className="location-display">
					<h3 className="location-display__label">Location</h3>
					<h4 className="location-display__address">
						{this.state.addressText}
					</h4>
					<GoogleMapDisplay
						center={{ lat: this.props.coords[0], lng: this.props.coords[1] }}
						user={this.props.user}
					/>
				</div>
			</React.Fragment>
		);
	}
}

export default LocationDisplay;
