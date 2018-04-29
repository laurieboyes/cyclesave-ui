import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect } from 'react-router-dom'

import { isAuthenticated } from './google-auth'

export default ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
					<Redirect
						to={{
							pathname: '/login'
						}}
					/>
				)
		}
	/>
);
