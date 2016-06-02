import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {
    it('is a Redux store configured with the correct reducer', () => {
        const store = makeStore()
        //get current state. it must be empty Map
        expect(store.getState()).to.equal(Map())

        //dispatch action SET_ENTIRES with entires
        store.dispatch({
            type: 'SET_ENTIRES',
            entries: ['Trainspotting', '28 Days Later']
        })
        //expected value - new entries added
        expect(store.getState()).to.equal(fromJS({
            entries: ['Trainspotting', '28 Days Later']
        }))
    })
})
