import React, { Component } from "react";
import Layout from "./js/components/Layout/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// CSS
import "./css/master.css";

// Content Block Components
import MainView from "./js/components/Main/MainView";
import LoginForm from "./js/components/Authentication/LoginForm";
import SignUpForm from "./js/components/Authentication/SignUpForm";
import AlertForm from "./js/components/Alert/AlertForm";
import AllGrdiansView from "./js/components/Grdians/AllGrdiansView";
import SingleGrdianView from "./js/components/Grdians/SingleGrdianView";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Router>
				<Layout>
					<Switch>
						<Route exact path="/" render={props => <MainView {...props} />} />
						<Route
							exact
							path="/main"
							render={props => <MainView {...props} />}
						/>
						<Route
							exact
							path="/login"
							render={props => <LoginForm {...props} />}
						/>
						<Route
							exact
							path="/signup"
							render={props => <SignUpForm {...props} />}
						/>
						<Route
							exact
							path="/alert"
							render={props => <AlertForm {...props} />}
						/>
						<Route
							exact
							path="/grdians"
							render={props => <AllGrdiansView {...props} />}
						/>
						<Route
							exact
							path="/grdians/:id"
							render={props => <SingleGrdianView {...props} />}
						/>
					</Switch>
				</Layout>
			</Router>
		);
	}
}

export default App;