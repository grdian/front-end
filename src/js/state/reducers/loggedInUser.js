import { nullUser } from "../API";

const loggedInUserReducer = (state = { ...nullUser }, action) => {
	switch (action.type) {
		case "SET_ID": {
			state = {
				...state,
				id: action.payload
			};
			break;
		}
		case "SET_ALERT_ID": {
			state = {
				...state,
				activeAlertId: action.payload
			};
			break;
		}
		case "SET_USER": {
			state = { ...action.payload };
			break;
		}
		default: {
			return state;
		}
	}
	return state;
};

export default loggedInUserReducer;
