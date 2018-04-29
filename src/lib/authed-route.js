import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect } from 'react-router-dom'

import googleAuth from './google-auth'

export default ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			googleAuth.isAuthenticated ? (
				<Component {...props} />
			) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location }
						}}
					/>
				)
		}
	/>
);
