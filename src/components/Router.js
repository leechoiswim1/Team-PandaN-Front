import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from '../shared/auth';

// pages
import { Home } from '../pages';

const Router = () => {
	return (
		<Switch>
			<Route path='/' component={Auth(Home, false)} exact />
		</Switch>
	);
};

export default Router;
