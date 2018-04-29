import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'


const Home = () => (
	<h2>Home</h2>
);

const Login = () => (
	<h2>Login</h2>
);

const fakeAuth = {
	isAuthenticated: false,
	authenticate (cb) {
		this.isAuthenticated = true;
		setTimeout(cb, 100); // fake async
	},
	signout (cb) {
		this.isAuthenticated = false;
		setTimeout(cb, 100);
	}
};

const AuthedRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			fakeAuth.isAuthenticated ? (
				<Component {...props} />
			) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location }
						}}
					/>
				)
		}
	/>
);

class HelloMessage extends React.Component {
	render () {
		return (
			<Router>
				<div>
					<AuthedRoute exact path='/' component={Home} />
					<Route path='/login' component={Login} />
				</div>
			</Router>
		)
	}
}


const mountNode = document.getElementById("app");
ReactDOM.render(<HelloMessage name="Jane" />, mountNode);
