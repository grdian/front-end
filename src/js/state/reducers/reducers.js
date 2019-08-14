import loggedInUserReducer from "./loggedInUser";
import pageLabelReducer from "./pageLabel";

import { combineReducers } from "redux";

const allReducers = combineReducers({
	loggedInUser: loggedInUserReducer,
	pageLabel: pageLabelReducer
});

export default allReducers;
