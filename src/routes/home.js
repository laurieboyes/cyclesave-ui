import React from 'react';
import ReactDOM from 'react-dom';

import { getAuthDetails } from '../lib/google-auth'

export default () => (
	<div>
		<h2>Home</h2>
		<p>Signed in as {getAuthDetails().email}</p>
	</div>
);
