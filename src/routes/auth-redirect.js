import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect } from 'react-router-dom'

import { validateTokenAndStore } from '../lib/google-auth'

function RedirectOnVerify (props) {
	if (props.tokenValidated) {
		return (<Redirect
			to={{
				pathname: '/'
			}}
		/>)
	} else {
		return <p>Verifying token...</p>
	}
}

export default class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount () {
		const accessToken = this.props.location.hash.match(/(?:access_token=)([^&]+)/)[1];
		validateTokenAndStore(accessToken)
			.then(() => {
				this.setState({ tokenValidated: true });
			})
	}

	render () {
		return <RedirectOnVerify tokenValidated={this.state.tokenValidated} />
	}
};
