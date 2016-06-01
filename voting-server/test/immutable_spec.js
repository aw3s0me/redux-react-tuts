import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {
    describe('a number', () => {
        function increment(currentState) {
            return currentState + 1;
        }

        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43); //next state will be 43
            expect(state).to.equal(42); //state is the same
        });
    });

    /**
     * Creates immutable list using Immutable.js library
     * And checks if it is really immutable after adding element
     * Old state remains unchanged
     *
     * NOTE!!! The old state would not have remained unchanged if we'd pushed
     * to a regular array!!!!!
     */
    describe('A list', () => {
        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }

        it('is immutable', () => {
            let state = List.of('Trainspotting', '28 Days Later');
            let nextState = addMovie(state, 'Sunshine');

            expect(nextState).to.equal(List.of(
                'Trainspotting',
                '28 Days Later',
                'Sunshine'
            )); //new state with new entry
            expect(state).to.equal(List.of(
                'Trainspotting',
                '28 Days Later'
            )); //not changed
        });
    });

    /**
     * Showing work with state tree
     * that is a nested data structure of Lists, Maps
     *
     * Apply operation == producing new tree state
     * PREVIOUS ONE - UNTOUCHED
     */
    describe('a tree', () => {
        function addMovie(currentState, movie) {
            return currentState.set(
                'movies',
                currentState.get('movies').push(movie)
            );
        }

        /**
         * Concise version
         * @param {[type]}
         * @param {[type]}
         */
        function addMovie2(currentState, movie) {
            return currentState.update('movies', movies => movies.push(movie));
        }

        it('is immutable', () => {
            let state = Map({
                movies: List.of('Trainspotting', '28 Days Later')
            });

            let nextState = addMovie(state, 'Sunshine');

            expect(nextState).to.equal(Map({
                movies: List.of(
                    'Trainspotting',
                    '28 Days Later',
                    'Sunshine'
                )
            }));

            expect(state).to.equal(Map({
                movies: List.of(
                    'Trainspotting',
                    '28 Days Later'
                )
            }));
        });
    });
});
