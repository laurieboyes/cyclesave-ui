import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect } from 'react-router-dom'

import { signIn, isAuthenticated } from '../lib/google-auth'

export default class extends React.Component {

	signIn = () => {
		signIn();
	};

	render () {
		return !isAuthenticated() ? (
			<div>
				<h2>Login</h2>
				<button onClick={this.signIn}>Sign in with Google</button>
			</div>
		) : (
				<Redirect
					to={{
						pathname: '/'
					}}
				/>
			);
	}
}
