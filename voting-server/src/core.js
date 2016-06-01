import {List, Map} from 'immutable';

/**
 * Initial tree state
 * Use as default value
 * @type {[type]}
 */
export const INITIAL_STATE = Map()

/**
 * Set an entries key in the state Map and
 * set the value as the given List of entries
 *
 * It produces the first of the state trees
 * @param {[type]}
 * @param {[type]}
 */
export function setEntries(state, entries) {
    //Need to pass entries to list constructor
    //They must be an immutable List by the time input in the state tree
    return state.set('entries', List(entries));
}

/**
 * Merge an update into old state,
 * where the first two entries are put in one List
 * and the rest in the new version of entries
 * @param  {[type]}   state [description]
 * @return {Function}       [description]
 */
export function next(state) {
    const entries = state.get('entries').concat(getWinners(state.get('vote')))

    if (entries.size === 1) {
        return state.remove('vote')
                    .remove('entries')
                    .set('winner', entries.first())
    }
    else {
        return state.merge({
            vote: Map({pair: entries.take(2)}),
            entries: entries.skip(2)
        })
    }
}

export function vote(state, entry) {
    return state.updateIn(
        ['vote', 'tally', entry],
        0,
        tally => tally + 1
    )
}

function getWinners(vote) {
    if (!vote) return []
    const [a, b] = vote.get('pair')
    const aVotes = vote.getIn(['tally', a], 0)
    const bVotes = vote.getIn(['tally', b], 0)
    if      (aVotes > bVotes) return [a]
    else if (aVotes < bVotes) return [b]
    else                      return [a, b]
}
