import React from 'react';

export default React.createClass({
    getPair: function() {
        return this.props.pair || []
    },
    /**
     * To prevent voting again
     * @return {Boolean} [description]
     */
    isDisabled: function() {
        return !!this.props.hasVoted
    },
    /**
     * Label for button that the user has voted on.
     * Visible for button whose entry === hasVoted prop
     * Helps to decide whether to render label or not
     * @param  {[type]}  entry [description]
     * @return {Boolean}       [description]
     */
    hasVotedFor: function(entry) {
        return this.props.hasVoted === entry
    },
    render: function() {
        return <div className="voting">
            {this.getPair().map(entry =>
                <button key={entry}
                        disabled={this.isDisabled()}
                        onClick={() => this.props.vote(entry)} >
                    <h1>{entry}</h1>
                    {this.hasVotedFor(entry)?
                        <div className="label">Voted</div>
                        : null}
                </button>
            )}
        </div>
    }
})
