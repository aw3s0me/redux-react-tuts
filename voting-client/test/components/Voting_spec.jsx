import Voting from '../../src/components/Voting';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import {expect} from 'chai';

describe('Voting', () => {
    it('renders a pair of buttons', () => {
        //use renderIntoDocument to render jsx components in unit testss
        const component = renderIntoDocument(
            <Voting pair={["Trainspotting", "28 Days Later"]}/>
        )
        /**
         * use scryRenderedDOMComponentsWithTag to find button element in component
         */

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

        /**
         * We should get 2 entries of buttons
         */
        expect(buttons.length).to.equal(2)
        //Their text should equal to these values
        expect(buttons[0].textContent).to.equal('Trainspotting')
        expect(buttons[1].textContent).to.equal('28 Days Later')
    })

    /**
     * Unit test to simulate click event for component
     * @param  {[type]} 'invokes callback      when a button is clicked' [description]
     * @param  {[type]} ()       [description]
     * @return {[type]}          [description]
     */
    it('invokes callback when a button is clicked', () => {
        let votedWith
        const vote = (entry) => votedWith = entry

        const component = renderIntoDocument(
            <Voting pair={['Trainspotting', '28 Days Later']}
                    vote={vote} />
        )

        /**
         * Find button element
         * @type {[type]}
         */
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button')
        //Run click event of button with text Trainspotting
        Simulate.click(buttons[0])

        expect(votedWith).to.equal('Trainspotting')
    })
})
