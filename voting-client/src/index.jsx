console.log('I am alive')

import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

//TODO: Hard coded. Later substitute to real pair
const pair = ['Trainspotting', '28 Days Later']

/**
 * Voting component takes pair of entries as props
 *
 * Mounted and rendered in #app div in index.html
 * @type {Object}
 */
ReactDOM.render(
    <Voting pair={pair} winner="Trainspotting"/>,
    document.getElementById('app')
)
