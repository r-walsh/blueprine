import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

import 'normalize-css';

import App from './components/App';
import Login from './components/Login';
import Settings from './components/Settings';
import Blueprint from './components/Blueprints';

document.addEventListener(`DOMContentLoaded`, () => {
	let reactNode = document.getElementById(`react-node`);

	if ( reactNode ) {
		ReactDOM.render(
			<Provider store={ store }>
				<Router history={ browserHistory }>
					<Route path="/" component={ App }>
						<Route path="login" component={ Login } />
						<Route path="settings" component={ Settings } />
						<Route path="blueprints" component={ Blueprint } />
					</Route>
				</Router>
			</Provider>
		, reactNode );
	}
});