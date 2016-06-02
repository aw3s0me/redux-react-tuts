console.log('I am alive')

import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';
import {Route, Router, hashHistory} from 'react-router';
import App from './components/App';
import Results from './components/Results';

/**
 * To define routing table
 * @type {[type]}
 */
const routes = <Route component={App}>
                    <Route path="/results" component={Results} />
                    <Route path="/" component={Voting} />
                </Route>

/**
 * Voting component takes pair of entries as props
 *
 * Mounted and rendered in #app div in index.html
 *
 * Supply the Router component as the root component of our app
 * Give it #hash based history mechanism
 *
 * Plug routes as child component
 * @type {Object}
 */
ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('app')
)
