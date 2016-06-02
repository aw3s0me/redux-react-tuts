import Voting from '../../src/components/Voting';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
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

    it('disables buttons when user has voted', () => {
        const component = renderIntoDocument(
            <Voting pair={['Trainspotting', '28 Days Later']} hasVoted="Trainspotting" />
        )
        const buttons = scryRenderedDOMComponentsWithTag(component, "button")

        expect(buttons.length).to.equal(2)
        expect(buttons[0].hasAttribute('disabled')).to.equal(true)
        expect(buttons[1].hasAttribute('disabled')).to.equal(true)
    })

    /**
     * Voted label should be present on the button
     * whose entry matches the value of hasVoted
     * @param  {[type]} 'adds label         to the voted entry' [description]
     * @param  {[type]} (     [description]
     * @return {[type]}       [description]
     */
    it('adds label to the voted entry', () => {
        const component = renderIntoDocument(
            <Voting pair={['Trainspotting', '28 Days Later']} hasVoted='Trainspotting' />
        )
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

        expect(buttons[0].textContent).to.contain('Voted')
    })

    /**
     * When theres winner, there should be no buttons
     * but instead an element with the winner ref
     * @param  {[type]} 'renders just          the winner when there is one' [description]
     * @param  {[type]} (        [description]
     * @return {[type]}          [description]
     */
    it('renders just the winner when there is one', () => {
        const component = renderIntoDocument(
            <Voting winner='Trainspotting' />
        )
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button')
        expect(buttons.length).to.equal(0)

        const winner = ReactDOM.findDOMNode(component.refs.winner)
        expect(winner).to.be.ok
        expect(winner.textContent).to.contain('Trainspotting')
    })
})
