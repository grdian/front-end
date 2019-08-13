import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import allReducers from "./js/state/reducers/reducers";
import { Provider } from "react-redux";
import FetchTester from "./js/state/FetchTester";

const globalDataStore = createStore(
	allReducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<Provider store={globalDataStore}>
		<App />
	</Provider>,
	document.querySelector("#root")
);

// ReactDOM.render(<FetchTester />, document.querySelector("#root"));
