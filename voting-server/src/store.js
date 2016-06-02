import {createStore} from 'redux';
import reducer from './reducer';

/**
 * Creates store using redux method that takes as an input -
 * - reducer function
 * @return {[type]} [description]
 */
export default function makeStore() {
    return createStore(reducer)
}
