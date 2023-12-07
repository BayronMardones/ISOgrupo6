// routes.js
import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import Home from "../pages/home.jsx";
import LoginPage from "../pages/login.jsx";
//import NotFoundPage from "./components/NotFoundPage";

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route path="/home" component={Home} />
				<Route path="/login" component={LoginPage} />
				<Redirect from="/" to="/home" exact />
			</Switch>
		</Router>
	);
};

export default Routes;
