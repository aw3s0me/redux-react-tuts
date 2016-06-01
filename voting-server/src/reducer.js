import {setEntries, next, vote, INITIAL_STATE} from './core';

/**
 * Delegate to function based on action type
 * +Knows how to unpack the additional arguments
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export default function reducer(state = INITIAL_STATE, action) {
    // Figure out which function to call and call it
    switch(action.type) {
        case 'SET_ENTIRES':
            return setEntries(state,action.entries)
        case 'NEXT':
            return next(state)
        case 'VOTE':
            return vote(state, action.entry)
    }
    //if called with undefined state, returns empty Map
    return state
}
