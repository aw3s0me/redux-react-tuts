import Voting from '../../src/components/Voting';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';
import {List} from 'immutable';

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

    /**
     * Just to show why to use immutable structures
     * And pure components
     * @param  {[type]} 'renders as            a pure component' [description]
     * @param  {[type]} (        [description]
     * @return {[type]}          [description]
     */
    it('renders as a pure component', () => {
        //Mutable structure - array
        const pair = ['Trainspotting', '28 Days Later'];
        //instead of using renderIntoDocument,
        //we manually construct a parent div
        //and rerender into it twice => able to simulate rerendering
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        /**
         * Get button
         * @type {[type]}
         */
        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Trainspotting');
        //cause MUTATION of array after rendering
        //IT MUST NOT BE RE-RENDERED. However it is re-rendered
        //=> So we NEED TO USE MIXINS!
        pair[0] = 'Sunshine';
        component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );
        /**
         * Get button
         * @type {[type]}
         */
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Trainspotting');
    })

    /**
     * But if we use real immutable list =>
     * It will be re-rendered!
     * @param  {[type]} 'does update        DOM when prop changes' [description]
     * @param  {[type]} (     [description]
     * @return {[type]}       [description]
     */
    it('does update DOM when prop changes', () => {
        const pair = List.of('Trainspotting', '28 Days Later');
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        /**
         *
         * @type {[type]}
         */
        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Trainspotting');

        const newPair = pair.set(0, 'Sunshine');
        //Will be rerendered. Because it does deep compare
        //Want to AVOID IT => Use MIXINS!
        component = ReactDOM.render(
            <Voting pair={newPair} />,
            container
        );

        /**
         *
         * @type {[type]}
         */
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Sunshine');
      });
})
