import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'

import googleAuth from '../lib/google-auth'

export default class extends React.Component {

	state = {
		redirectToReferrer: false
	};

	signIn = () => {
		googleAuth.authenticate(() => {
			this.setState({ redirectToReferrer: true });
		});
	};

	render () {
		const { from } = this.props.location.state || { from: { pathname: "/" } };
		const { redirectToReferrer } = this.state;

		if (redirectToReferrer) {
			return <Redirect to={from} />;
		}

		return (
			<div>
				<h2>Login</h2>
				<button onClick={this.signIn}>Sign in with Google</button>
			</div>
		);
	}
}
