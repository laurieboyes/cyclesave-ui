export function signIn () {
	const form = document.createElement('form');
	form.setAttribute('method', 'GET');
	form.setAttribute('action', 'https://accounts.google.com/o/oauth2/v2/auth');


	const clientId = '447838384773-9n5pf96vipeuedm8ls2und2uu0ekteqt.apps.googleusercontent.com';
	const redirectUrl = `${window.location.origin}/auth-redirect`;

	const scope = [
		'https://www.googleapis.com/auth/fitness.activity.read',
		'https://www.googleapis.com/auth/fitness.location.read'
	].join(' ');

	var params = {
		'client_id': clientId,
		'redirect_uri': redirectUrl,
		'response_type': 'token',
		'scope': scope,
		'include_granted_scopes': 'true',
		'state': 'pass-through value'
	};

	for (let p in params) {
		const input = document.createElement('input');
		input.setAttribute('type', 'hidden');
		input.setAttribute('name', p);
		input.setAttribute('value', params[p]);
		form.appendChild(input);
	}

	document.body.appendChild(form);
	form.submit();
}

export function validateTokenAndStore (accessToken) {
	return fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`)
		.then(res => res.json())
		.then(tokenDetails => {
			localStorage.setItem('authDetails', JSON.stringify({
				accessToken,
				email: tokenDetails.email,
				expiry: tokenDetails.exp * 1000
			}));
		})
}

export function isAuthenticated (accessToken) {
	const authDetails = JSON.parse(localStorage.getItem('authDetails') || '{}');
	return Boolean(+authDetails.expiry || 0 > new Date().getTime());
}

export function getAuthDetails (accessToken) {
	const authDetails = JSON.parse(localStorage.getItem('authDetails') || '{}');
	if (authDetails.expiry || 0 > new Date().getTime()) {
		return authDetails;
	} else {
		throw Error('Can\'t get details: Auth expired or missing');
	}
}
