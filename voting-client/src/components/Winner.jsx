import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

/**
 * Separated logic for winner (separate component)
 * @param  {String} ) {                   return <div ref [description]
 * @return {[type]}   [description]
 */
export default React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        return <div ref="winner">Winner is {this.props.winner}!</div>
    }

})
