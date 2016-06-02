import React from 'react';
import {List, Map} from 'immutable';

const pair = List.of('Trainspotting', '28 Days Later')
const tally = Map({'Trainspotting': 5, '28 Days Later': 4})

/**
 * Root component
 * Will be shared for all concrete routes.
 * That is how root component App looks like
 *
 *  Use it to render all markup that is common across all routes
 *
 * @param  {[type]} ) {                   return React.cloneElement(this.props.children, {pair: pair})    }} [description]
 * @return {[type]}   [description]
 */
export default React.createClass({
    render: function() {
        //does nothing. except
        //rendering its child components, given as props
        return React.cloneElement(this.props.children, {
            pair: pair,
            tally: tally
        })
    }
})
