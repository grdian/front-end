const loggedInUserReducer = (state = { id: -1 }, action) => {
	switch (action.type) {
		case "SET_ID": {
			state = {
				...state,
				id: action.payload
			};
			return state;
		}
		default: {
			return state;
		}
	}
};

export default loggedInUserReducer;
