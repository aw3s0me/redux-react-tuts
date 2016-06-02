import React from 'react';
import Winner from './Winner';
import Vote from './Vote';
import PureRenderMixin from 'react-addons-pure-render-mixin';

/**
 * Voting process.
 * Need ref="winner" for unit-testing to grab corresponding DOM component
 * @param  {String} ) {                   return <div className [description]
 * @return {[type]}   [description]
 */
export default React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        return <div className="voting">
            {this.props.winner ?
                <Winner ref="winner" winner={this.props.winner} />:
                <Vote {...this.props} />}
        </div>
    }
})
