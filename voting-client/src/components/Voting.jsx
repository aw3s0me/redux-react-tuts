import React from 'react';
import Winner from './Winner';
import Vote from './Vote';

/**
 * Voting process.
 * Need ref="winner" for unit-testing to grab corresponding DOM component
 * @param  {String} ) {                   return <div className [description]
 * @return {[type]}   [description]
 */
export default React.createClass({
    render: function() {
        return <div className="voting">
            {this.props.winner ?
                <Winner ref="winner" winner={this.props.winner} />:
                <Vote {...this.props} />}
        </div>
    }
})
