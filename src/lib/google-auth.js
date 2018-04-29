function redirectToGoogleSignIn () {
	const form = document.createElement('form');
	form.setAttribute('method', 'GET');
	form.setAttribute('action', 'https://accounts.google.com/o/oauth2/v2/auth');


	const clientId = '447838384773-9n5pf96vipeuedm8ls2und2uu0ekteqt.apps.googleusercontent.com';
	const redirectUrl = 'http://localhost:1234/auth-redirect'; // todo make env agnostic

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

export function validateAndStoreToken (accessToken) {
	return fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`)
		.then(res => res.json())
		.then(tokenDeets => {
			console.log('tokenDeets', tokenDeets);
		})
}

const fakeAuth = {
	isAuthenticated: false,

	authenticate (cb) {
		redirectToGoogleSignIn();
	},

	signout (cb) {
		this.isAuthenticated = false;
		setTimeout(cb, 100);
	}
};

export default fakeAuth;
