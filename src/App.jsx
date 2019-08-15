import React, { Component } from "react";
import Layout from "./js/components/Layout/Layout";
import { Link, Redirect } from "react-router-dom";
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
import SingleAlertView from "./js/components/Alert/SingleAlertView";
import ComponentTemplate from "./js/components/Temp/ComponentTemplate";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<React.Fragment>
				<Router>
					<Layout>
						<Switch>
							<Route
								exact
								path="/signup"
								render={props => <SignUpForm {...props} />}
							/>

							<Route
								exact
								path="/"
								render={props => <LoginForm {...props} />}
							/>

							<Route
								exact
								path="/login"
								render={props => <LoginForm {...props} />}
							/>

							<Route
								exact
								path="/main"
								render={props => <MainView {...props} />}
							/>

							<Route
								exact
								path="/alertform"
								render={props => <AlertForm {...props} />}
							/>

							<Route
								exact
								path="/grdians/:id"
								render={props => <SingleGrdianView {...props} />}
							/>

							<Route
								exact
								path="/alerts/:id"
								render={props => <SingleAlertView {...props} />}
							/>

							<Route
								exact
								path="/grdians"
								render={props => <AllGrdiansView {...props} />}
							/>

							<Route
								exact
								path="/template"
								render={props => <ComponentTemplate {...props} />}
							/>
						</Switch>
					</Layout>
				</Router>
			</React.Fragment>
		);
	}
}

export default App;
