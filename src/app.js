import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import AuthedRoute from './lib/authed-route';

import Home from './routes/home';
import Login from './routes/login';
import AuthRedirect from './routes/auth-redirect';

ReactDOM.render((
	<Router>
		<div>
			<AuthedRoute exact path='/' component={Home} />
			<Route path='/login' component={Login} />
			<Route path='/auth-redirect' component={AuthRedirect} />
		</div>
	</Router>
), document.getElementById('app'));
