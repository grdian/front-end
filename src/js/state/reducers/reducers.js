import loggedInUserReducer from "./loggedInUser";

import { combineReducers } from "redux";

const allReducers = combineReducers({
	loggedInUser: loggedInUserReducer
});

export default allReducers;
