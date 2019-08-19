import React, { Component } from "react";
import * as Geolocator from "../../state/Geolocator";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";
import { nullUser } from "../../state/API";

class GoogleMapDisplay extends Component {
	static defaultProps = {
		center: {
			lat: 40.0162232,
			lng: -83.01433
		},
		zoom: 16,
		user: nullUser
	};

	constructor(props) {
		super(props);
		this.state = { geoPoint: { lat: 0, lng: 0 } };
	}

	componentDidMount() {
		this.setState({ geoPoint: this.props.center });
	}

	render() {
		return (
			// Important! Always set the container height explicitly
			<div className="map-display">
				<GoogleMapReact
					bootstrapURLKeys={{ key: Geolocator.GOOGLE_MAPS_API_KEY }}
					defaultCenter={this.props.center}
					defaultZoom={this.props.zoom}
					yesIWantToUseGoogleMapApiInternals={true}
				>
					<MapMarker
						lat={this.props.center.lat}
						lng={this.props.center.lng}
						userLabel={
							this.props.user.firstName + " " + this.props.user.lastName
						}
						imgURL={this.props.user.imgURL}
					/>
				</GoogleMapReact>
			</div>
		);
	}
}

export default GoogleMapDisplay;
