import {setEntries, next, vote} from './core';

/**
 * Delegate to function based on action type
 * +Knows how to unpack the additional arguments
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export default function reducer(state, action) {
    // Figure out which function to call and call it
    switch(action.type) {
        case 'SET_ENTIRES':
            return setEntries(state,action.entries)
        case 'NEXT':
            return next(state)
        case 'VOTE':
            return vote(state, action.entry)
    }
    return state
}
