import React from 'react';

import { validateAndStoreToken } from '../lib/google-auth'

export default class extends React.Component {
	render () {
		const accessToken = this.props.location.hash.match(/(?:access_token=)([^&]+)/)[1];
		validateAndStoreToken(accessToken);
		return <p>Hey cool</p>
	}
};
