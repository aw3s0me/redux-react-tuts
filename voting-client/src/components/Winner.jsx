import React from 'react';

/**
 * Separated logic for winner (separate component)
 * @param  {String} ) {                   return <div ref [description]
 * @return {[type]}   [description]
 */
export default React.createClass({
    render: function() {
        return <div ref="winner">Winner is {this.props.winner}!</div>
    }

})
