const loggedInUserReducer = (
	state = {
		id: -1,
		firstName: "No User Logged In",
		lastName: "",
		imgURL: "",
		phoneNumber: "",
		emailAddress: "",
		activeAlertId: -1,
		grdians: []
	},
	action
) => {
	switch (action.type) {
		case "SET_ID": {
			state = {
				...state,
				id: action.payload
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
