import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './header';
import Feature from './feature';
import Welcome from './welcome';
import Signin from './auth/signin';
import Signout from './auth/signout';
import Signup from './auth/signup';
import requireAuth from './auth/require_auth';

export default class App extends Component {

	render() {
		return (
			<BrowserRouter>
				<div>
					<Header />
					<Switch>
						<Route path="/signin" component={Signin} /> 
						<Route path="/signout" component={Signout} /> 
						<Route path="/signup" component={Signup} /> 
						<Route path="/feature" component={requireAuth(Feature)} /> 
						<Route path="/" component={Welcome} /> 
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}
