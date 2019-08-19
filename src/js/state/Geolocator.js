export const GOOGLE_MAPS_API_KEY = "xxx";

const GEOLOCATION_OPTIONS = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};

const error = exception => {
	console.warn("Geolocation Error: " + exception.message);
};

export async function getCurrentCoordinates() {
	return new Promise(function(resolve, reject) {
		navigator.geolocation.getCurrentPosition(
			position => {
				resolve([position.coords.latitude, position.coords.longitude]);
			},
			error,
			GEOLOCATION_OPTIONS
		);
	});
}

export async function getGeoPointCoordinates() {
	return new Promise(function(resolve, reject) {
		navigator.geolocation.getCurrentPosition(
			position => {
				resolve({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
			},
			error,
			GEOLOCATION_OPTIONS
		);
	});
}

export async function logCurrentLocation() {
	let pointPromise = getGeoPointCoordinates();
	pointPromise.then(point => {
		console.log(point);
		console.log(GOOGLE_MAPS_API_KEY);
		// this.setState({ geoPoint: point });
	});
}
