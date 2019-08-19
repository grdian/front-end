import React, { Component } from "react";
import * as Geolocator from "../../state/Geolocator";

class Geolocation extends Component {
	constructor(props) {
		super(props);
		this.state = { coordinates: [2.3, 0.5] };
	}

	componentDidMount() {
		let coordinatePromise = Geolocator.getCurrentCoordinates();
		coordinatePromise.then(coords => {
			this.setState({ coordinates: coords });
		});
	}

	render() {
		return (
			<React.Fragment>
				<h1>Geolocation</h1>
				<h3>Latitude: {this.state.coordinates[0]}</h3>
				<h3>Longitude: {this.state.coordinates[1]}</h3>
			</React.Fragment>
		);
	}
}

export default Geolocation;
